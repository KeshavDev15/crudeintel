'use client';

import { useNews } from '@/hooks/useNews';
import { NewsCard } from '@/components/dashboard/NewsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useState } from 'react';

export default function NewsPage() {
  const { data: news, isLoading, refetch } = useNews();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await api.refreshNews();
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const bullishCount = news?.filter((n) => n.sentiment === 'bullish').length || 0;
  const bearishCount = news?.filter((n) => n.sentiment === 'bearish').length || 0;
  const neutralCount = news?.filter((n) => n.sentiment === 'neutral').length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Market News</h1>
          <p className="text-zinc-400">
            AI-analyzed oil market news with sentiment scoring
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Sentiment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-600/20">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Bullish Articles</p>
                <p className="text-2xl font-bold text-emerald-400">{bullishCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-600/20">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Bearish Articles</p>
                <p className="text-2xl font-bold text-red-400">{bearishCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-zinc-600/20">
                <Minus className="h-6 w-6 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Neutral Articles</p>
                <p className="text-2xl font-bold text-zinc-400">{neutralCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-emerald-500" />
            Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full flex">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${(bullishCount / (news?.length || 1)) * 100}%`,
                  }}
                />
                <div
                  className="h-full bg-zinc-500"
                  style={{
                    width: `${(neutralCount / (news?.length || 1)) * 100}%`,
                  }}
                />
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${(bearishCount / (news?.length || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
            <Badge
              variant={
                bullishCount > bearishCount
                  ? 'bullish'
                  : bearishCount > bullishCount
                  ? 'bearish'
                  : 'neutral'
              }
            >
              {bullishCount > bearishCount
                ? 'Bullish'
                : bearishCount > bullishCount
                ? 'Bearish'
                : 'Neutral'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-500">
              No news articles available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
