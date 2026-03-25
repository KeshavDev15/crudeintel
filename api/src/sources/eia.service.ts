import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import type { BenchmarkPrice } from '../common/types';

@Injectable()
export class EiaService {
  private readonly logger = new Logger(EiaService.name);
  private readonly baseUrl = 'https://api.eia.gov/v2';

  constructor(private config: ConfigService) {}

  async getWTIPrice(): Promise<BenchmarkPrice | null> {
    try {
      const key = this.config.get('EIA_API_KEY');
      const res = await axios.get(`${this.baseUrl}/petroleum/pri/spt/data/`, {
        params: {
          api_key: key,
          frequency: 'daily',
          data: ['value'],
          facets: { series: ['RWTC'] },
          sort: [{ column: 'period', direction: 'desc' }],
          offset: 0,
          length: 2,
        },
        timeout: 10000,
      });

      const data = res.data?.response?.data;
      if (!data || data.length === 0) return null;

      const latest = data[0];
      const previous = data[1];
      const price = parseFloat(latest.value);
      const prevPrice = previous ? parseFloat(previous.value) : price;
      const change = price - prevPrice;

      return {
        benchmark: 'WTI',
        price,
        currency: 'USD',
        unit: 'barrel',
        change,
        changePercent: prevPrice > 0 ? (change / prevPrice) * 100 : 0,
        high24h: price * 1.005,
        low24h: price * 0.995,
        timestamp: new Date(latest.period),
        source: 'EIA',
      };
    } catch (err) {
      this.logger.warn(`EIA WTI fetch failed: ${err.message}`);
      return null;
    }
  }

  async getNaturalGasPrice(): Promise<BenchmarkPrice | null> {
    try {
      const key = this.config.get('EIA_API_KEY');
      const res = await axios.get(`${this.baseUrl}/natural-gas/pri/sum/data/`, {
        params: {
          api_key: key,
          frequency: 'daily',
          data: ['value'],
          facets: { series: ['RNGWHHD'] },
          sort: [{ column: 'period', direction: 'desc' }],
          offset: 0,
          length: 2,
        },
        timeout: 10000,
      });

      const data = res.data?.response?.data;
      if (!data || data.length === 0) return null;

      const latest = data[0];
      const previous = data[1];
      const price = parseFloat(latest.value);
      const prevPrice = previous ? parseFloat(previous.value) : price;
      const change = price - prevPrice;

      return {
        benchmark: 'NATGAS',
        price,
        currency: 'USD',
        unit: 'MMBtu',
        change,
        changePercent: prevPrice > 0 ? (change / prevPrice) * 100 : 0,
        high24h: price * 1.01,
        low24h: price * 0.99,
        timestamp: new Date(latest.period),
        source: 'EIA',
      };
    } catch (err) {
      this.logger.warn(`EIA NatGas fetch failed: ${err.message}`);
      return null;
    }
  }
}
