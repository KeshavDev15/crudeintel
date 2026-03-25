import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import type { BenchmarkPrice, BenchmarkKey } from '../common/types';
import { YAHOO_TICKERS } from '../common/constants';

@Injectable()
export class YahooService {
  private readonly logger = new Logger(YahooService.name);

  async getPrice(benchmark: 'WTI' | 'BRENT' | 'NATGAS'): Promise<BenchmarkPrice | null> {
    try {
      const ticker = YAHOO_TICKERS[benchmark];
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;

      const res = await axios.get(url, {
        params: { interval: '1d', range: '5d' },
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const result = res.data?.chart?.result?.[0];
      if (!result) return null;

      const meta = result.meta;
      const price = meta.regularMarketPrice ?? meta.previousClose;
      const prev = meta.previousClose ?? price;
      const change = price - prev;

      return {
        benchmark: benchmark as BenchmarkKey,
        price,
        currency: meta.currency ?? 'USD',
        unit: benchmark === 'NATGAS' ? 'MMBtu' : 'barrel',
        change,
        changePercent: prev > 0 ? (change / prev) * 100 : 0,
        high24h: meta.regularMarketDayHigh ?? price * 1.005,
        low24h: meta.regularMarketDayLow ?? price * 0.995,
        volume: meta.regularMarketVolume,
        timestamp: new Date(meta.regularMarketTime * 1000),
        source: 'YAHOO',
      };
    } catch (err) {
      this.logger.warn(`Yahoo ${benchmark} fetch failed: ${err.message}`);
      return null;
    }
  }
}
