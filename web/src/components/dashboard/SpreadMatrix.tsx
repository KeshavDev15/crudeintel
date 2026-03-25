'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SpreadData {
  from: string;
  to: string;
  spread: number;
}

interface SpreadMatrixProps {
  data: SpreadData[];
}

const BENCHMARKS = ['WTI', 'BRENT', 'OPEC', 'DUBAI', 'NATGAS'];

export function SpreadMatrix({ data }: SpreadMatrixProps) {
  const getSpread = (from: string, to: string): number | null => {
    if (from === to) return null;
    const found = data.find((d) => d.from === from && d.to === to);
    return found ? found.spread : null;
  };

  const getColorClass = (spread: number | null): string => {
    if (spread === null) return 'bg-zinc-800';
    if (spread > 3) return 'bg-emerald-600/30 text-emerald-400';
    if (spread > 1) return 'bg-yellow-600/30 text-yellow-400';
    if (spread > 0) return 'bg-zinc-700 text-zinc-300';
    return 'bg-red-600/30 text-red-400';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spread Matrix (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-2 text-left text-zinc-400">From / To</th>
                {BENCHMARKS.map((b) => (
                  <th key={b} className="p-2 text-center text-zinc-400">
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((from) => (
                <tr key={from}>
                  <td className="p-2 font-medium text-zinc-300">{from}</td>
                  {BENCHMARKS.map((to) => {
                    const spread = getSpread(from, to);
                    return (
                      <td
                        key={to}
                        className={cn(
                          'p-2 text-center font-mono text-xs',
                          getColorClass(spread)
                        )}
                      >
                        {spread === null ? '-' : spread.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
