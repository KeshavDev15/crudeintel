import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EiaService } from '../sources/eia.service';
import { AlphaVantageService } from '../sources/alphavantage.service';
import { YahooService } from '../sources/yahoo.service';
import type { BenchmarkPrice } from '../common/types';

@Injectable()
export class PricesService implements OnModuleInit {
  private readonly logger = new Logger(PricesService.name);
  private readonly prisma = new PrismaClient();

  // In-memory cache: latest prices for instant reads
  private cache: Map<string, BenchmarkPrice> = new Map();

  constructor(
    private eia: EiaService,
    private alphaVantage: AlphaVantageService,
    private yahoo: YahooService,
  ) {}

  async onModuleInit() {
    await this.fetchAllPrices();
  }

  // Main fetch orchestrator
  async fetchAllPrices(): Promise<BenchmarkPrice[]> {
    this.logger.log('Fetching all benchmark prices...');

    const results = await Promise.allSettled([
      this.fetchWTI(),
      this.fetchBrent(),
      this.fetchOPEC(),
      this.fetchDubai(),
      this.fetchNatGas(),
    ]);

    const prices: BenchmarkPrice[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        prices.push(result.value);
      }
    }

    this.logger.log(`Fetched ${prices.length}/5 benchmarks`);
    return prices;
  }

  private async fetchWTI(): Promise<BenchmarkPrice> {
    // Try EIA first (most authoritative for WTI), fall back to Yahoo
    const eia = await this.eia.getWTIPrice();
    if (eia) {
      this.saveToCache(eia);
      await this.saveToDB(eia);
      return eia;
    }

    const yahoo = await this.yahoo.getPrice('WTI');
    if (yahoo) {
      this.saveToCache(yahoo);
      await this.saveToDB(yahoo);
      return yahoo;
    }

    return this.getMockPrice('WTI', 83.45);
  }

  private async fetchBrent(): Promise<BenchmarkPrice> {
    const av = await this.alphaVantage.getCrudeOilPrice('BRENT');
    if (av) {
      this.saveToCache(av);
      await this.saveToDB(av);
      return av;
    }

    const yahoo = await this.yahoo.getPrice('BRENT');
    if (yahoo) {
      this.saveToCache(yahoo);
      await this.saveToDB(yahoo);
      return yahoo;
    }

    return this.getMockPrice('BRENT', 87.2);
  }

  private async fetchOPEC(): Promise<BenchmarkPrice> {
    // OPEC basket is not freely available via API.
    // Estimate: OPEC basket typically trades ~$1-2 below Brent
    const brent = this.cache.get('BRENT');
    const basePrice = brent ? brent.price - 1.4 : 85.8;
    const price = this.getMockPrice('OPEC', basePrice);
    this.saveToCache(price);
    await this.saveToDB(price);
    return price;
  }

  private async fetchDubai(): Promise<BenchmarkPrice> {
    // Dubai/Oman: typically ~$0.50-1.50 below Brent
    const brent = this.cache.get('BRENT');
    const basePrice = brent ? brent.price - 0.8 : 86.4;
    const price = this.getMockPrice('DUBAI', basePrice);
    this.saveToCache(price);
    await this.saveToDB(price);
    return price;
  }

  private async fetchNatGas(): Promise<BenchmarkPrice> {
    const eia = await this.eia.getNaturalGasPrice();
    if (eia) {
      this.saveToCache(eia);
      await this.saveToDB(eia);
      return eia;
    }

    const yahoo = await this.yahoo.getPrice('NATGAS');
    if (yahoo) {
      this.saveToCache(yahoo);
      await this.saveToDB(yahoo);
      return yahoo;
    }

    return this.getMockPrice('NATGAS', 2.34);
  }

  // Cache helpers
  private saveToCache(price: BenchmarkPrice) {
    this.cache.set(price.benchmark, price);
  }

  getAllCached(): BenchmarkPrice[] {
    return Array.from(this.cache.values());
  }

  getCached(benchmark: string): BenchmarkPrice | null {
    return this.cache.get(benchmark) ?? null;
  }

  // DB helpers
  private async saveToDB(price: BenchmarkPrice) {
    try {
      await this.prisma.priceSnapshot.create({
        data: {
          benchmark: price.benchmark,
          price: price.price,
          currency: price.currency,
          unit: price.unit,
          source: price.source,
          change: price.change,
          changePercent: price.changePercent,
          timestamp: price.timestamp,
        },
      });
    } catch (err) {
      this.logger.warn(`DB save failed for ${price.benchmark}: ${err.message}`);
    }
  }

  async getHistory(benchmark: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return this.prisma.priceSnapshot.findMany({
      where: { benchmark, timestamp: { gte: since } },
      orderBy: { timestamp: 'asc' },
      distinct: ['benchmark'],
    });
  }

  async getHistoryGroupedByDay(benchmark: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT
        DATE(timestamp) as date,
        AVG(price) as avg_price,
        MAX(price) as high,
        MIN(price) as low,
        (ARRAY_AGG(price ORDER BY timestamp DESC))[1] as close
      FROM "PriceSnapshot"
      WHERE benchmark = ${benchmark}
        AND timestamp >= ${since}
      GROUP BY DATE(timestamp)
      ORDER BY DATE(timestamp) ASC
    `;

    return rows.map((r) => ({
      date: r.date,
      price: parseFloat(r.avg_price),
      high: parseFloat(r.high),
      low: parseFloat(r.low),
      close: parseFloat(r.close),
    }));
  }

  // Mock fallback
  private getMockPrice(benchmark: string, basePrice: number): BenchmarkPrice {
    // Add small random variation so it looks live
    const variation = (Math.random() - 0.5) * 0.4;
    const price = parseFloat((basePrice + variation).toFixed(2));
    const change = parseFloat(variation.toFixed(2));

    const mockPrice: BenchmarkPrice = {
      benchmark: benchmark as any,
      price,
      currency: 'USD',
      unit: benchmark === 'NATGAS' ? 'MMBtu' : 'barrel',
      change,
      changePercent: parseFloat(((change / basePrice) * 100).toFixed(2)),
      high24h: parseFloat((price * 1.005).toFixed(2)),
      low24h: parseFloat((price * 0.995).toFixed(2)),
      timestamp: new Date(),
      source: 'MOCK',
    };

    this.saveToCache(mockPrice);
    return mockPrice;
  }
}
