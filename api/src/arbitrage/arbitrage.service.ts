import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PricesService } from '../prices/prices.service';
import type { ArbitrageOpportunity } from '../common/types';
import {
  MIN_ARBITRAGE_SPREAD,
  TRANSACTION_COST_PER_BARREL,
} from '../common/constants';

@Injectable()
export class ArbitrageService {
  private readonly logger = new Logger(ArbitrageService.name);
  private readonly prisma = new PrismaClient();

  constructor(private prices: PricesService) {}

  detectOpportunities(): ArbitrageOpportunity[] {
    const currentPrices = this.prices
      .getAllCached()
      .filter((p) => p.unit === 'barrel'); // Only compare barrel-priced benchmarks

    if (currentPrices.length < 2) return [];

    const opportunities: ArbitrageOpportunity[] = [];

    // Compare every pair of benchmarks
    for (let i = 0; i < currentPrices.length; i++) {
      for (let j = i + 1; j < currentPrices.length; j++) {
        const a = currentPrices[i];
        const b = currentPrices[j];

        // Determine buy (lower) and sell (higher)
        const [buy, sell] = a.price < b.price ? [a, b] : [b, a];

        const spread = sell.price - buy.price;
        const spreadPercent = (spread / buy.price) * 100;
        const estimatedProfit = spread - TRANSACTION_COST_PER_BARREL;
        const isViable = spread >= MIN_ARBITRAGE_SPREAD;

        opportunities.push({
          id: `${buy.benchmark}-${sell.benchmark}-${Date.now()}`,
          buyBenchmark: buy.benchmark,
          sellBenchmark: sell.benchmark,
          buyPrice: buy.price,
          sellPrice: sell.price,
          spread: parseFloat(spread.toFixed(2)),
          spreadPercent: parseFloat(spreadPercent.toFixed(2)),
          estimatedProfit: parseFloat(estimatedProfit.toFixed(2)),
          isViable,
          detectedAt: new Date(),
        });
      }
    }

    // Sort by spread descending — best opportunities first
    return opportunities.sort((a, b) => b.spread - a.spread);
  }

  getBestOpportunities(n = 3): ArbitrageOpportunity[] {
    return this.detectOpportunities()
      .filter((o) => o.isViable)
      .slice(0, n);
  }

  async saveOpportunities(opportunities: ArbitrageOpportunity[]) {
    for (const opp of opportunities.filter((o) => o.isViable)) {
      await this.prisma.arbitrageOpportunity
        .create({
          data: {
            buyBenchmark: opp.buyBenchmark,
            sellBenchmark: opp.sellBenchmark,
            buyPrice: opp.buyPrice,
            sellPrice: opp.sellPrice,
            spread: opp.spread,
            spreadPercent: opp.spreadPercent,
          },
        })
        .catch(() => {}); // Swallow duplicate errors
    }
  }

  async getHistory(limit = 50) {
    return this.prisma.arbitrageOpportunity.findMany({
      orderBy: { detectedAt: 'desc' },
      take: limit,
    });
  }

  // Spread analysis: how has WTI-Brent spread changed over time
  async getSpreadHistory(benchmark1: string, benchmark2: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT
        DATE(detected_at) as date,
        AVG(spread) as avg_spread,
        MAX(spread) as max_spread,
        MIN(spread) as min_spread
      FROM "ArbitrageOpportunity"
      WHERE (buy_benchmark = ${benchmark1} AND sell_benchmark = ${benchmark2})
         OR (buy_benchmark = ${benchmark2} AND sell_benchmark = ${benchmark1})
        AND detected_at >= ${since}
      GROUP BY DATE(detected_at)
      ORDER BY DATE(detected_at) ASC
    `;

    return rows;
  }
}
