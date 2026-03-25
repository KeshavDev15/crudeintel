'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function usePredictions() {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: api.getPredictions,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrediction(benchmark: string) {
  return useQuery({
    queryKey: ['prediction', benchmark],
    queryFn: () => api.getPrediction(benchmark),
    staleTime: 5 * 60 * 1000,
  });
}
