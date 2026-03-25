'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import type { NewsItem } from '@/lib/api';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'from-emerald-500/20 to-transparent';
      case 'bearish':
        return 'from-red-500/20 to-transparent';
      default:
        return 'from-zinc-500/20 to-transparent';
    }
  };

  return (
    <Card className="group relative overflow-hidden hover:border-emerald-600/30 transition-all duration-300 bg-gradient-to-b from-zinc-900 to-zinc-950">
      {/* Sentiment gradient overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getSentimentColor(news.sentiment)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2 text-zinc-200 group-hover:text-white transition-colors">
            {news.title}
          </CardTitle>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          >
            <Badge variant={news.sentiment}>{news.sentiment}</Badge>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <motion.p
          className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {news.description}
        </motion.p>

        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <motion.span
            className="flex items-center gap-1"
            whileHover={{ color: '#a1a1aa' }}
          >
            <Globe className="h-3 w-3" />
            {news.source}
          </motion.span>
          <motion.span
            className="flex items-center gap-1"
            whileHover={{ color: '#a1a1aa' }}
          >
            <Clock className="h-3 w-3" />
            {formatDate(news.publishedAt)}
          </motion.span>
        </div>

        <motion.a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-emerald-500 hover:text-emerald-400 font-medium group/link"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Read full article
          <motion.div
            className="ml-1"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <ExternalLink className="h-3 w-3" />
          </motion.div>
        </motion.a>
      </CardContent>
    </Card>
  );
}
