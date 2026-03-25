export const BENCHMARKS = {
  WTI: { name: 'WTI Crude Oil', unit: 'barrel', currency: 'USD' },
  BRENT: { name: 'Brent Crude Oil', unit: 'barrel', currency: 'USD' },
  OPEC: { name: 'OPEC Basket', unit: 'barrel', currency: 'USD' },
  DUBAI: { name: 'Dubai/Oman Crude', unit: 'barrel', currency: 'USD' },
  NATGAS: { name: 'Natural Gas', unit: 'MMBtu', currency: 'USD' },
} as const;

// Typical transaction costs per barrel for arbitrage viability check
export const TRANSACTION_COST_PER_BARREL = 0.5; // $0.50/barrel

// Minimum spread to flag as arbitrage opportunity
export const MIN_ARBITRAGE_SPREAD = 0.8; // $0.80/barrel

// Yahoo Finance ticker symbols
export const YAHOO_TICKERS = {
  WTI: 'CL=F',
  BRENT: 'BZ=F',
  NATGAS: 'NG=F',
};

// EIA series IDs
export const EIA_SERIES = {
  WTI: 'PET.RWTC.D',
  NATGAS: 'NG.RNGWHHD.D',
};
