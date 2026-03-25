'use client';

import { useArbitrage, useSpreadMatrix } from '@/hooks/useArbitrage';
import { ArbitrageCard } from '@/components/dashboard/ArbitrageCard';
import { SpreadMatrix } from '@/components/dashboard/SpreadMatrix';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight, TrendingUp, AlertCircle } from 'lucide-react';

export default function ArbitragePage() {
  const { data: opportunities, isLoading, realtimeAlert } = useArbitrage(10);
  const { data: spreadMatrix } = useSpreadMatrix();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const highSpreadOpps = opportunities?.filter((o) => o.spreadPercent > 2) || [];
  const totalPotentialProfit = opportunities?.reduce((sum, o) => sum + o.netProfit, 0) || 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Arbitrage Detection</h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Find price discrepancies across crude oil benchmarks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-600/20">
                <ArrowLeftRight className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-zinc-400">Active Opportunities</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {opportunities?.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-amber-600/20">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-zinc-400">High Spread ({'>'}2%)</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{highSpreadOpps.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 md:col-span-1">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-blue-600/20">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-zinc-400">Total Potential Profit</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  ${totalPotentialProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Realtime Alert */}
      {realtimeAlert && realtimeAlert.spreadPercent > 2 && (
        <Card className="border-emerald-500/50 bg-emerald-950/20">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="animate-pulse">
                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500" />
              </div>
              <Badge variant="bullish" className="sm:hidden">Live</Badge>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm sm:text-base text-emerald-400">
                New Opportunity Detected!
              </p>
              <p className="text-xs sm:text-sm text-zinc-400">
                {realtimeAlert.buyBenchmark} → {realtimeAlert.sellBenchmark} |
                Spread: {realtimeAlert.spreadPercent.toFixed(2)}%
              </p>
            </div>
            <Badge variant="bullish" className="hidden sm:inline-flex">Live</Badge>
          </CardContent>
        </Card>
      )}

      {/* Spread Matrix */}
      {spreadMatrix && <SpreadMatrix data={spreadMatrix} />}

      {/* Opportunities List */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">All Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities && opportunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {opportunities.map((opp, idx) => (
                <ArbitrageCard key={idx} opportunity={opp} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-zinc-500">
              No arbitrage opportunities found at this time
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
