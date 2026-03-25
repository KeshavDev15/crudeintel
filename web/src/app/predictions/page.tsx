'use client';

import { usePredictions } from '@/hooks/usePredictions';
import { PredictionCard } from '@/components/dashboard/PredictionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles, Clock } from 'lucide-react';

export default function PredictionsPage() {
  const { data: predictions, isLoading, error } = usePredictions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">AI Predictions</h1>
        <p className="text-sm sm:text-base text-zinc-400">
          AI-powered price predictions based on market data and news sentiment
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-500/30 bg-blue-950/20">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-4">
          <div className="flex items-center gap-3 sm:block">
            <div className="p-2.5 sm:p-3 rounded-lg bg-blue-600/20">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
            <div className="sm:hidden flex items-center gap-2 text-zinc-500 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>Updates every 5 min</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm sm:text-base text-blue-400">AI-Powered Analysis</p>
            <p className="text-xs sm:text-sm text-zinc-400">
              Predictions are generated using Google Gemini 2.5 Flash, analyzing current prices,
              historical trends, and news sentiment
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-sm">
            <Clock className="h-4 w-4" />
            <span>Updates every 5 min</span>
          </div>
        </CardContent>
      </Card>

      {/* Predictions Grid */}
      {error ? (
        <Card>
          <CardContent className="py-6 sm:py-8 text-center">
            <p className="text-sm sm:text-base text-zinc-500">
              Unable to load predictions. Please try again later.
            </p>
          </CardContent>
        </Card>
      ) : predictions && predictions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.benchmark} prediction={prediction} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6 sm:py-8 text-center">
            <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-zinc-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-zinc-500">
              Predictions are being generated. This may take a moment...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Methodology */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Prediction Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-sm sm:text-base text-white">Data Sources</h3>
              <ul className="text-xs sm:text-sm text-zinc-400 space-y-1">
                <li>• EIA official prices</li>
                <li>• Alpha Vantage market data</li>
                <li>• Yahoo Finance quotes</li>
                <li>• NewsAPI sentiment analysis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm sm:text-base text-white">Analysis Factors</h3>
              <ul className="text-xs sm:text-sm text-zinc-400 space-y-1">
                <li>• Current price levels</li>
                <li>• 24h price movement</li>
                <li>• Historical volatility</li>
                <li>• News sentiment score</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm sm:text-base text-white">Time Horizons</h3>
              <ul className="text-xs sm:text-sm text-zinc-400 space-y-1">
                <li>• 1 Day forecast</li>
                <li>• 7 Day forecast</li>
                <li>• 30 Day forecast</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
