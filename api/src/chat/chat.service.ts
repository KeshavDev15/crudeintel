import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PricesService } from '../prices/prices.service';
import { NewsService } from '../news/news.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    private config: ConfigService,
    private pricesService: PricesService,
    private newsService: NewsService,
  ) {
    this.genAI = new GoogleGenerativeAI(this.config.get('GEMINI_API_KEY') || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async chat(message: string): Promise<string> {
    this.logger.log(`Processing chat: ${message}`);

    // Get current market context
    const prices = this.pricesService.getAllCached();
    const news = await this.newsService.getLatestNews(5);

    const priceContext = prices.length > 0
      ? prices.map(p => `${p.benchmark}: $${p.price.toFixed(2)} (${p.changePercent >= 0 ? '+' : ''}${p.changePercent.toFixed(2)}%)`).join('\n')
      : 'Price data currently unavailable';

    const newsContext = news.length > 0
      ? news.map(n => `- ${n.title} (${n.sentiment})`).join('\n')
      : 'No recent news';

    const systemPrompt = `You are CrudeIntel AI, an expert crude oil market analyst and prediction bot.

CURRENT MARKET DATA:
${priceContext}

RECENT NEWS:
${newsContext}

INSTRUCTIONS:
- Answer questions about crude oil prices, predictions, and market analysis
- When asked for predictions, provide specific price targets for 1-day, 7-day, and 30-day horizons
- Include confidence levels (low/medium/high) with predictions
- Explain your reasoning based on current prices and news sentiment
- Be concise but informative
- If asked about non-oil topics, politely redirect to oil market analysis
- Use bullet points for clarity when listing multiple points

USER QUESTION: ${message}`;

    try {
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      this.logger.error(`Chat failed: ${err.message}`);
      return "I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }
}
