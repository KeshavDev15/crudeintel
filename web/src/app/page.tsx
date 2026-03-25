'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { usePrices } from '@/hooks/usePrices';
import { useArbitrage } from '@/hooks/useArbitrage';
import { useNews } from '@/hooks/useNews';
import { BenchmarkCard } from '@/components/dashboard/BenchmarkCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { ArbitrageCard } from '@/components/dashboard/ArbitrageCard';
import { NewsCard } from '@/components/dashboard/NewsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, Newspaper, Activity, Droplets } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Dashboard() {
  const { data: prices, isLoading: pricesLoading } = usePrices();
  const { data: arbitrage, realtimeAlert, isLoading: arbLoading } = useArbitrage(3);
  const { data: news, isLoading: newsLoading } = useNews();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && !pricesLoading) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [pricesLoading]);

  if (pricesLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500/20" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-emerald-500" />
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Droplets className="h-5 w-5 text-emerald-500" />
          <span className="text-zinc-400 font-medium">Loading market data...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Real-time crude oil market intelligence
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="h-4 w-4 text-emerald-500" />
          </motion.div>
          <span className="text-sm text-zinc-400">Live</span>
        </motion.div>
      </motion.div>

      {/* Realtime Alert */}
      <AnimatePresence>
        {realtimeAlert && realtimeAlert.spreadPercent > 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Card className="border-amber-500/50 bg-gradient-to-r from-amber-950/30 to-amber-900/20 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <CardContent className="flex items-center gap-4 py-4 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-medium text-amber-400">
                    High Spread Alert: {realtimeAlert.buyBenchmark} → {realtimeAlert.sellBenchmark}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Spread: {realtimeAlert.spreadPercent.toFixed(2)}% | Potential profit: $
                    {realtimeAlert.netProfit.toFixed(2)}
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Badge variant="bullish">Live</Badge>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={containerVariants}
      >
        {prices?.map((price, index) => (
          <motion.div
            key={price.benchmark}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <BenchmarkCard data={price} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Arbitrage Row */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {prices && <PriceChart data={prices} />}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="h-full bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </motion.div>
                Top Arbitrage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {arbLoading ? (
                <motion.div
                  className="flex items-center gap-2 text-zinc-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="h-4 w-4 rounded-full border-2 border-zinc-700 border-t-emerald-500 animate-spin" />
                  Loading...
                </motion.div>
              ) : arbitrage && arbitrage.length > 0 ? (
                arbitrage.map((opp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ArbitrageCard opportunity={opp} />
                  </motion.div>
                ))
              ) : (
                <div className="text-zinc-500">No opportunities found</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* News Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Newspaper className="h-5 w-5 text-emerald-500" />
              </motion.div>
              Latest News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsLoading ? (
                <motion.div
                  className="flex items-center gap-2 text-zinc-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading news...
                </motion.div>
              ) : news && news.length > 0 ? (
                news.slice(0, 6).map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <NewsCard news={item} />
                  </motion.div>
                ))
              ) : (
                <div className="text-zinc-500">No news available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
