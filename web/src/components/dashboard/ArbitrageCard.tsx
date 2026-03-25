'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { ArbitrageOpportunity } from '@/lib/api';

interface ArbitrageCardProps {
  opportunity: ArbitrageOpportunity;
}

export function ArbitrageCard({ opportunity }: ArbitrageCardProps) {
  const isProfitable = opportunity.spreadPercent > 2;

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 ${
        isProfitable
          ? 'border-emerald-600/50 bg-gradient-to-br from-emerald-950/30 to-zinc-950'
          : 'bg-gradient-to-b from-zinc-900 to-zinc-950'
      }`}
    >
      {/* Animated shine effect for profitable */}
      {isProfitable && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      )}

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <motion.span
              className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {opportunity.buyBenchmark}
            </motion.span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4 text-emerald-500" />
            </motion.div>
            <motion.span
              className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {opportunity.sellBenchmark}
            </motion.span>
          </CardTitle>
          {isProfitable && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Badge variant="bullish" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                High Spread
              </Badge>
            </motion.div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/30"
            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <p className="text-xs text-zinc-500 mb-1">Buy Price</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(opportunity.buyPrice)}
            </p>
          </motion.div>
          <motion.div
            className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/30"
            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <p className="text-xs text-zinc-500 mb-1">Sell Price</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(opportunity.sellPrice)}
            </p>
          </motion.div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/50 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Spread</span>
            <div className="flex items-center gap-2">
              {/* Spread bar */}
              <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    isProfitable ? 'bg-emerald-500' : 'bg-zinc-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(opportunity.spreadPercent * 20, 100)}%` }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </div>
              <span
                className={`text-sm font-bold ${
                  isProfitable ? 'text-emerald-400' : 'text-zinc-300'
                }`}
              >
                {formatPercent(opportunity.spreadPercent)}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Net Profit
            </span>
            <motion.span
              className="text-sm font-bold text-emerald-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {formatCurrency(opportunity.netProfit)}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
