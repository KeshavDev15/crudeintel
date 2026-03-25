import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { PricesService } from '../prices/prices.service';
import { NewsService } from '../news/news.service';
import type { PricePrediction } from '../common/types';

@Injectable()
export class PredictionService {
  private readonly logger = new Logger(PredictionService.name);
  private readonly prisma = new PrismaClient();
  private genAI: GoogleGenerativeAI;
  private model: any;

  // Cache predictions so we don't call Gemini on every request
  private predictionCache: Map<
    string,
    { prediction: PricePrediction; cachedAt: Date }
  > = new Map();
  private CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

  constructor(
    private config: ConfigService,
    private pricesService: PricesService,
    private newsService: NewsService,
  ) {
    this.genAI = new GoogleGenerativeAI(this.config.get('GEMINI_API_KEY') || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async getPrediction(benchmark: string): Promise<PricePrediction> {
    // Check cache first
    const cached = this.predictionCache.get(benchmark);
    if (cached && Date.now() - cached.cachedAt.getTime() < this.CACHE_TTL_MS) {
      return cached.prediction;
    }

    return this.generatePrediction(benchmark);
  }

  private async generatePrediction(benchmark: string): Promise<PricePrediction> {
    this.logger.log(`Generating AI prediction for ${benchmark}...`);

    // Gather context
    const currentPrice = this.pricesService.getCached(benchmark);
    const history = await this.pricesService.getHistoryGroupedByDay(
      benchmark,
      30,
    );
    const allPrices = this.pricesService.getAllCached();
    const news = await this.newsService.getLatestNews(5);

    if (!currentPrice) {
      throw new Error(`No price data for ${benchmark}`);
    }

    // Build context string for Gemini
    const priceHistorySummary =
      history.length > 0
        ? history
            .slice(-7)
            .map((h) => `${h.date}: $${h.price.toFixed(2)}`)
            .join(', ')
        : 'No historical data available';

    const otherBenchmarks = allPrices
      .filter((p) => p.benchmark !== benchmark)
      .map(
        (p) =>
          `${p.benchmark}: $${p.price.toFixed(2)} (${p.changePercent > 0 ? '+' : ''}${p.changePercent.toFixed(2)}%)`,
      )
      .join(', ');

    const newsHeadlines = news.map((n) => `- ${n.title}`).join('\n');

    const prompt = `You are an expert crude oil market analyst with 20 years of experience.

Current market data:
- ${benchmark} price: $${currentPrice.price.toFixed(2)}/barrel
- 24h change: ${currentPrice.change > 0 ? '+' : ''}$${currentPrice.change.toFixed(2)} (${currentPrice.changePercent > 0 ? '+' : ''}${currentPrice.changePercent.toFixed(2)}%)
- 7-day price history: ${priceHistorySummary}
- Other benchmarks: ${otherBenchmarks}

Recent news headlines:
${newsHeadlines || 'No recent news available'}

Based on this data, provide a price prediction for ${benchmark} crude oil.

Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks, just pure JSON):
{
  "predicted1d": <number>,
  "predicted7d": <number>,
  "predicted30d": <number>,
  "confidence": <number 0-100>,
  "sentiment": "<bullish|bearish|neutral>",
  "reasoning": "<2-3 sentence explanation>",
  "keyFactors": ["<factor 1>", "<factor 2>", "<factor 3>"]
}

Be realistic. Base predictions on actual market dynamics. Do not be overly optimistic or pessimistic.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');

      const parsed = JSON.parse(jsonMatch[0]);

      const prediction: PricePrediction = {
        benchmark,
        currentPrice: currentPrice.price,
        predicted1d: parsed.predicted1d,
        predicted7d: parsed.predicted7d,
        predicted30d: parsed.predicted30d,
        confidence: parsed.confidence,
        reasoning: parsed.reasoning,
        sentiment: parsed.sentiment,
        keyFactors: parsed.keyFactors,
        generatedAt: new Date(),
      };

      // Save to cache and DB
      this.predictionCache.set(benchmark, {
        prediction,
        cachedAt: new Date(),
      });
      await this.savePrediction(prediction);

      return prediction;
    } catch (err) {
      this.logger.error(
        `Gemini prediction failed for ${benchmark}: ${err.message}`,
      );
      return this.getFallbackPrediction(currentPrice.price, benchmark);
    }
  }

  private async savePrediction(pred: PricePrediction) {
    await this.prisma.pricePrediction
      .create({
        data: {
          benchmark: pred.benchmark,
          currentPrice: pred.currentPrice,
          predicted1d: pred.predicted1d,
          predicted7d: pred.predicted7d,
          predicted30d: pred.predicted30d,
          confidence: pred.confidence,
          reasoning: pred.reasoning,
          sentiment: pred.sentiment,
          keyFactors: pred.keyFactors,
        },
      })
      .catch((err) =>
        this.logger.warn(`Failed to save prediction: ${err.message}`),
      );
  }

  private getFallbackPrediction(
    currentPrice: number,
    benchmark: string,
  ): PricePrediction {
    return {
      benchmark,
      currentPrice,
      predicted1d: currentPrice * 1.001,
      predicted7d: currentPrice * 1.005,
      predicted30d: currentPrice * 1.02,
      confidence: 45,
      reasoning:
        'Prediction unavailable — using neutral baseline. Market conditions remain uncertain.',
      sentiment: 'neutral',
      keyFactors: [
        'API unavailable',
        'Using fallback model',
        'Monitor market conditions',
      ],
      generatedAt: new Date(),
    };
  }

  async getPredictionHistory(benchmark: string, limit = 10) {
    return this.prisma.pricePrediction.findMany({
      where: { benchmark },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getAllPredictions(): Promise<PricePrediction[]> {
    const benchmarks = ['WTI', 'BRENT', 'OPEC', 'DUBAI', 'NATGAS'];
    const predictions = await Promise.allSettled(
      benchmarks.map((b) => this.getPrediction(b)),
    );

    return predictions
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<PricePrediction>).value);
  }
}
