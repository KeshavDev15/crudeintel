export interface BenchmarkPrice {
  benchmark: 'WTI' | 'BRENT' | 'OPEC' | 'DUBAI' | 'NATGAS';
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume?: number;
  timestamp: Date;
  source: string;
}

export interface ArbitrageOpportunity {
  id: string;
  buyBenchmark: string;
  sellBenchmark: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  spreadPercent: number;
  netProfit: number;
  isViable: boolean;
  detectedAt: Date;
}

export interface PricePrediction {
  benchmark: string;
  currentPrice: number;
  predicted1d: number;
  predicted7d: number;
  predicted30d: number;
  confidence: number;
  reasoning: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  keyFactors: string[];
  generatedAt: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: Date;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  impact: 'high' | 'medium' | 'low';
}

export type BenchmarkKey = 'WTI' | 'BRENT' | 'OPEC' | 'DUBAI' | 'NATGAS';
