'use client';

import { useState } from 'react';
import { usePrices, usePriceHistory } from '@/hooks/usePrices';
import { BenchmarkCard } from '@/components/dashboard/BenchmarkCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatDate } from '@/lib/utils';

const BENCHMARKS = ['WTI', 'BRENT', 'OPEC', 'DUBAI', 'NATGAS'];

export default function MarketsPage() {
  const [selectedBenchmark, setSelectedBenchmark] = useState('WTI');
  const { data: prices, isLoading } = usePrices();
  const { data: history } = usePriceHistory(selectedBenchmark);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const chartData = history?.map((item) => ({
    time: item.timestamp ? formatDate(item.timestamp) : '',
    price: item.price,
  })) || [];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Markets</h1>
        <p className="text-sm sm:text-base text-zinc-400">Track crude oil benchmark prices in real-time</p>
      </div>

      {/* All Benchmarks */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {prices?.map((price) => (
          <BenchmarkCard key={price.benchmark} data={price} />
        ))}
      </div>

      {/* Detailed View */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
            <TabsList className="flex flex-wrap h-auto gap-1">
              {BENCHMARKS.map((b) => (
                <TabsTrigger key={b} value={b} className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">
                  {b}
                </TabsTrigger>
              ))}
            </TabsList>
            {BENCHMARKS.map((b) => (
              <TabsContent key={b} value={b}>
                <div className="h-[250px] sm:h-[400px] mt-3 sm:mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tick={{ fontSize: 10 }} />
                      <YAxis stroke="#9ca3af" fontSize={10} tick={{ fontSize: 10 }} domain={['auto', 'auto']} width={45} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: '1px solid #3f3f46',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {prices?.map((price) => (
                <div
                  key={price.benchmark}
                  className="flex items-center justify-between py-1.5 sm:py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="font-medium text-sm sm:text-base text-zinc-300">{price.benchmark}</span>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-sm sm:text-base text-white">${price.price.toFixed(2)}</span>
                    <span
                      className={`text-xs sm:text-sm ${
                        price.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {price.changePercent >= 0 ? '+' : ''}
                      {price.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {prices?.map((price) => (
                <div
                  key={price.benchmark}
                  className="flex items-center justify-between py-1.5 sm:py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="font-medium text-sm sm:text-base text-zinc-300">{price.benchmark}</span>
                  <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-zinc-800 text-zinc-400">
                    {price.source}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
