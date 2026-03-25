'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api, BenchmarkPrice } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export function usePrices() {
  const [realtimePrices, setRealtimePrices] = useState<BenchmarkPrice[]>([]);

  const query = useQuery({
    queryKey: ['prices'],
    queryFn: api.getPrices,
    refetchInterval: 60000,
  });

  useEffect(() => {
    const socket = getSocket();

    socket.on('priceUpdate', (data: { prices: BenchmarkPrice[]; timestamp: Date }) => {
      setRealtimePrices(data.prices);
    });

    return () => {
      socket.off('priceUpdate');
    };
  }, []);

  return {
    ...query,
    data: realtimePrices.length > 0 ? realtimePrices : query.data,
  };
}

export function usePriceHistory(benchmark: string) {
  return useQuery({
    queryKey: ['priceHistory', benchmark],
    queryFn: () => api.getPriceHistory(benchmark),
  });
}
