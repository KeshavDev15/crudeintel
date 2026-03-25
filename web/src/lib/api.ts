const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface BenchmarkPrice {
  benchmark: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume?: number;
  timestamp: string;
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
  timestamp: string;
}

export interface PricePrediction {
  benchmark: string;
  currentPrice: number;
  predicted1d: number;
  predicted7d: number;
  predicted30d: number;
  confidence: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  reasoning: string;
  keyFactors: string[];
  generatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  relevanceScore: number;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getPrices: () => fetchApi<BenchmarkPrice[]>('/prices'),
  getPrice: (benchmark: string) => fetchApi<BenchmarkPrice>(`/prices/${benchmark}`),
  getPriceHistory: (benchmark: string) =>
    fetchApi<BenchmarkPrice[]>(`/prices/${benchmark}/history`),
  refreshPrices: () => fetchApi<BenchmarkPrice[]>('/prices/refresh/all'),

  getArbitrage: () => fetchApi<ArbitrageOpportunity[]>('/arbitrage'),
  getBestArbitrage: (limit = 5) =>
    fetchApi<ArbitrageOpportunity[]>(`/arbitrage/best?limit=${limit}`),
  getArbitrageHistory: () => fetchApi<ArbitrageOpportunity[]>('/arbitrage/history'),
  getSpreadMatrix: () =>
    fetchApi<{ from: string; to: string; spread: number }[]>('/arbitrage/spread'),

  getPredictions: () => fetchApi<PricePrediction[]>('/predictions'),
  getPrediction: (benchmark: string) =>
    fetchApi<PricePrediction>(`/predictions/${benchmark}`),

  getNews: () => fetchApi<NewsItem[]>('/news'),
  refreshNews: () => fetchApi<NewsItem[]>('/news/refresh'),
};
