'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Brain, Sparkles, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { PricePrediction } from '@/lib/api';

interface PredictionCardProps {
  prediction: PricePrediction;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const getDirectionIcon = (predicted: number, current: number) => {
    const diff = predicted - current;
    if (diff > 0.5) return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    if (diff < -0.5) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-zinc-400" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-emerald-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-zinc-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'from-emerald-500';
    if (confidence >= 60) return 'from-yellow-500';
    return 'from-zinc-500';
  };

  const getSentimentGradient = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'from-emerald-500/10 via-transparent to-transparent';
      case 'bearish':
        return 'from-red-500/10 via-transparent to-transparent';
      default:
        return 'from-zinc-500/10 via-transparent to-transparent';
    }
  };

  const predictions = [
    { horizon: '1 Day', price: prediction.predicted1d, icon: '24h' },
    { horizon: '7 Days', price: prediction.predicted7d, icon: '7d' },
    { horizon: '30 Days', price: prediction.predicted30d, icon: '30d' },
  ];

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50 hover:border-emerald-600/30 transition-all duration-300">
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getSentimentGradient(prediction.sentiment)} opacity-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
      />

      {/* AI sparkle effect */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="h-5 w-5 text-emerald-500/30" />
      </motion.div>

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Target className="h-4 w-4 text-emerald-500" />
            </motion.div>
            <CardTitle className="text-lg text-white">{prediction.benchmark}</CardTitle>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Badge variant={prediction.sentiment === 'bullish' ? 'bullish' : prediction.sentiment === 'bearish' ? 'bearish' : 'secondary'}>
              {prediction.sentiment}
            </Badge>
          </motion.div>
        </div>
        <motion.p
          className="text-sm text-zinc-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Current: <span className="text-white font-medium">{formatCurrency(prediction.currentPrice)}</span>
        </motion.p>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-3">
          {predictions.map((pred, index) => {
            const changePercent =
              ((pred.price - prediction.currentPrice) / prediction.currentPrice) * 100;
            const isPositive = changePercent >= 0;

            return (
              <motion.div
                key={pred.horizon}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-emerald-500/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}
                    animate={{ y: isPositive ? [0, -2, 0] : [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {pred.icon}
                  </motion.div>
                  <div>
                    <span className="text-sm text-zinc-300">{pred.horizon}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getDirectionIcon(pred.price, prediction.currentPrice)}
                      <span
                        className={`text-xs ${
                          isPositive ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {formatPercent(changePercent)}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.span
                  className="text-lg font-bold text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
                  {formatCurrency(pred.price)}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Confidence meter */}
        <motion.div
          className="mt-4 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Confidence
            </span>
            <span className={`text-sm font-bold ${getConfidenceColor(prediction.confidence)}`}>
              {prediction.confidence}%
            </span>
          </div>
          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getConfidenceBg(prediction.confidence)} to-transparent rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${prediction.confidence}%` }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <motion.p
          className="mt-3 text-xs text-zinc-500 italic leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {prediction.reasoning}
        </motion.p>

        {prediction.keyFactors && prediction.keyFactors.length > 0 && (
          <motion.div
            className="mt-3 flex flex-wrap gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {prediction.keyFactors.map((factor, i) => (
              <motion.span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
              >
                {factor}
              </motion.span>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
