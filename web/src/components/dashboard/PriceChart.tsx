'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BenchmarkPrice } from '@/lib/api';

interface PriceChartProps {
  data: BenchmarkPrice[];
  title?: string;
}

const COLORS: Record<string, string> = {
  WTI: '#10b981',
  BRENT: '#3b82f6',
  OPEC: '#f59e0b',
  DUBAI: '#ec4899',
  NATGAS: '#8b5cf6',
};

export function PriceChart({ data, title = 'Price Overview' }: PriceChartProps) {
  const chartData = data.map((item) => ({
    name: item.benchmark,
    price: item.price,
    fill: COLORS[item.benchmark] || '#6b7280',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
