'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api, ArbitrageOpportunity } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export function useArbitrage(limit = 5) {
  const [realtimeAlert, setRealtimeAlert] = useState<ArbitrageOpportunity | null>(null);

  const query = useQuery({
    queryKey: ['arbitrage', limit],
    queryFn: () => api.getBestArbitrage(limit),
    refetchInterval: 60000,
  });

  useEffect(() => {
    const socket = getSocket();

    socket.on('arbitrageAlert', (opportunity: ArbitrageOpportunity) => {
      setRealtimeAlert(opportunity);
    });

    return () => {
      socket.off('arbitrageAlert');
    };
  }, []);

  return {
    ...query,
    realtimeAlert,
  };
}

export function useSpreadMatrix() {
  return useQuery({
    queryKey: ['spreadMatrix'],
    queryFn: api.getSpreadMatrix,
    refetchInterval: 120000,
  });
}
