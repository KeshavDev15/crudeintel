import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import type { BenchmarkPrice } from '../common/types';

@Injectable()
export class AlphaVantageService {
  private readonly logger = new Logger(AlphaVantageService.name);
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(private config: ConfigService) {}

  async getCrudeOilPrice(type: 'WTI' | 'BRENT'): Promise<BenchmarkPrice | null> {
    try {
      const key = this.config.get('ALPHA_VANTAGE_KEY');
      const fn = type === 'WTI' ? 'WTI' : 'BRENT';

      const res = await axios.get(this.baseUrl, {
        params: { function: fn, interval: 'daily', apikey: key },
        timeout: 15000,
      });

      const data = res.data?.data;
      if (!data || data.length === 0) return null;

      const latest = data[0];
      const previous = data[1];
      const price = parseFloat(latest.value);
      const prevPrice = previous ? parseFloat(previous.value) : price;
      const change = price - prevPrice;

      return {
        benchmark: type,
        price,
        currency: 'USD',
        unit: 'barrel',
        change,
        changePercent: prevPrice > 0 ? (change / prevPrice) * 100 : 0,
        high24h: price * 1.005,
        low24h: price * 0.995,
        timestamp: new Date(latest.date),
        source: 'ALPHAVANTAGE',
      };
    } catch (err) {
      this.logger.warn(`AlphaVantage ${type} fetch failed: ${err.message}`);
      return null;
    }
  }
}
