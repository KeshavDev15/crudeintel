import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NewsItem } from '../common/types';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly prisma = new PrismaClient();
  private genAI: GoogleGenerativeAI;
  private model: any;
  private newsCache: NewsItem[] = [];
  private lastFetch: Date = new Date(0);

  constructor(private config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(this.config.get('GEMINI_API_KEY') || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async fetchNews(): Promise<NewsItem[]> {
    try {
      const key = this.config.get('NEWS_API_KEY');
      const res = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'crude oil OR "oil prices" OR OPEC OR "Brent crude" OR "WTI"',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20,
          apiKey: key,
        },
        timeout: 10000,
      });

      const articles = res.data?.articles ?? [];

      const items: NewsItem[] = await Promise.all(
        articles.slice(0, 10).map(async (a: any, i: number) => {
          const sentiment = await this.analyzeSentiment(a.title, a.description);
          return {
            id: `news-${Date.now()}-${i}`,
            title: a.title,
            description: a.description ?? '',
            url: a.url,
            source: a.source?.name ?? 'Unknown',
            publishedAt: new Date(a.publishedAt),
            sentiment: sentiment.sentiment,
            impact: sentiment.impact,
          };
        }),
      );

      this.newsCache = items;
      this.lastFetch = new Date();

      // Save to DB
      for (const item of items) {
        await this.prisma.newsArticle
          .upsert({
            where: { url: item.url },
            update: { sentiment: item.sentiment, impact: item.impact },
            create: {
              title: item.title,
              description: item.description,
              url: item.url,
              source: item.source,
              publishedAt: item.publishedAt,
              sentiment: item.sentiment,
              impact: item.impact,
            },
          })
          .catch(() => {});
      }

      return items;
    } catch (err) {
      this.logger.warn(`News fetch failed: ${err.message}`);
      return this.getMockNews();
    }
  }

  async getLatestNews(limit = 10): Promise<NewsItem[]> {
    // Return cache if fresh (< 30 min)
    const cacheAge = Date.now() - this.lastFetch.getTime();
    if (this.newsCache.length > 0 && cacheAge < 30 * 60 * 1000) {
      return this.newsCache.slice(0, limit);
    }

    const news = await this.fetchNews();
    return news.slice(0, limit);
  }

  private async analyzeSentiment(
    title: string,
    description: string,
  ): Promise<{
    sentiment: 'bullish' | 'bearish' | 'neutral';
    impact: 'high' | 'medium' | 'low';
  }> {
    try {
      const prompt = `Analyze this crude oil news headline for market sentiment.
Title: "${title}"
${description ? `Description: "${description.slice(0, 200)}"` : ''}

Reply with ONLY valid JSON (no markdown, no code blocks): {"sentiment":"bullish|bearish|neutral","impact":"high|medium|low"}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const json = JSON.parse(text.match(/\{.*\}/s)?.[0] ?? '{}');
      return {
        sentiment: json.sentiment ?? 'neutral',
        impact: json.impact ?? 'medium',
      };
    } catch {
      return { sentiment: 'neutral', impact: 'medium' };
    }
  }

  private getMockNews(): NewsItem[] {
    return [
      {
        id: 'mock-1',
        title: 'OPEC+ maintains production cuts amid market uncertainty',
        description: 'The alliance agreed to hold current output levels...',
        url: '#',
        source: 'Reuters',
        publishedAt: new Date(),
        sentiment: 'bullish',
        impact: 'high',
      },
      {
        id: 'mock-2',
        title: 'WTI crude slips as US inventories rise unexpectedly',
        description: 'EIA data showed a 4.2M barrel build...',
        url: '#',
        source: 'Bloomberg',
        publishedAt: new Date(),
        sentiment: 'bearish',
        impact: 'medium',
      },
      {
        id: 'mock-3',
        title: 'Geopolitical tensions support Brent crude prices',
        description: 'Middle East tensions continue to underpin oil prices...',
        url: '#',
        source: 'FT',
        publishedAt: new Date(),
        sentiment: 'bullish',
        impact: 'medium',
      },
    ];
  }
}
