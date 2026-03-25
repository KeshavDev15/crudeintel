'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { BenchmarkPrice } from '@/lib/api';

interface BenchmarkCardProps {
  data: BenchmarkPrice;
}

export function BenchmarkCard({ data }: BenchmarkCardProps) {
  const isPositive = data.changePercent >= 0;

  return (
    <Card className="group relative overflow-hidden hover:border-emerald-600/50 transition-all duration-300 bg-gradient-to-b from-zinc-900 to-zinc-950">
      {/* Animated gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-1.5 sm:pb-2 relative z-10 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.div
            className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Droplet className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500" />
          </motion.div>
          <CardTitle className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
            {data.benchmark}
          </CardTitle>
        </div>
        <motion.span
          className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
            isPositive
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-red-400 bg-red-500/10'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: isPositive ? [0, -2, 0] : [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isPositive ? (
              <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            ) : (
              <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            )}
          </motion.div>
          {formatPercent(data.changePercent)}
        </motion.span>
      </CardHeader>
      <CardContent className="relative z-10 px-3 sm:px-6 pb-3 sm:pb-6">
        <motion.div
          className="text-lg sm:text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {formatCurrency(data.price)}
        </motion.div>

        {/* High/Low bar visualization */}
        <div className="mt-2 sm:mt-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-zinc-500">24h Range</span>
          </div>
          <div className="relative h-1 sm:h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-zinc-400 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-lg shadow-white/30"
              style={{
                left: `${((data.price - data.low24h) / (data.high24h - data.low24h)) * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500">
            <span>{formatCurrency(data.low24h)}</span>
            <span>{formatCurrency(data.high24h)}</span>
          </div>
        </div>

        <motion.p
          className="text-[10px] sm:text-xs text-zinc-600 mt-1.5 sm:mt-2 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500/50" />
          {data.source}
        </motion.p>
      </CardContent>
    </Card>
  );
}
