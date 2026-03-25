'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: api.getNews,
    refetchInterval: 5 * 60 * 1000,
  });
}
