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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Predictions</h1>
        <p className="text-zinc-400">
          Claude-powered price predictions based on market data and news sentiment
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-500/30 bg-blue-950/20">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="p-3 rounded-lg bg-blue-600/20">
            <Brain className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-blue-400">AI-Powered Analysis</p>
            <p className="text-sm text-zinc-400">
              Predictions are generated using Google Gemini 1.5 Flash, analyzing current prices,
              historical trends, and news sentiment
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Clock className="h-4 w-4" />
            <span>Updates every 5 min</span>
          </div>
        </CardContent>
      </Card>

      {/* Predictions Grid */}
      {error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-zinc-500">
              Unable to load predictions. Please try again later.
            </p>
          </CardContent>
        </Card>
      ) : predictions && predictions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.benchmark} prediction={prediction} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <Sparkles className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500">
              Predictions are being generated. This may take a moment...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Methodology */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-white">Data Sources</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>• EIA official prices</li>
                <li>• Alpha Vantage market data</li>
                <li>• Yahoo Finance quotes</li>
                <li>• NewsAPI sentiment analysis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-white">Analysis Factors</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>• Current price levels</li>
                <li>• 24h price movement</li>
                <li>• Historical volatility</li>
                <li>• News sentiment score</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-white">Time Horizons</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
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
