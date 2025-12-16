import { addMinutes, format, subMinutes } from "date-fns";

export interface TickData {
  timestamp: string;
  symbol: string;
  price: number;
  size: number;
}

export interface AnalyticsData {
  timestamp: string;
  spread: number;
  zScore: number;
  hedgeRatio: number;
  priceA: number;
  priceB: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export const SYMBOLS = ["BTC-USDT", "ETH-USDT", "SOL-USDT", "BNB-USDT"];

// Generate initial historical data
export const generateHistoricalData = (points = 100): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  let priceA = 50000;
  let priceB = 3000;
  let spread = 0;
  
  const now = new Date();

  for (let i = points; i >= 0; i--) {
    const time = subMinutes(now, i);
    
    // Random walk
    priceA += (Math.random() - 0.5) * 100;
    priceB += (Math.random() - 0.5) * 10;
    
    // Cointegrate-ish behavior
    const theoreticalSpread = priceA - (16.5 * priceB); // Mock hedge ratio
    spread = theoreticalSpread + (Math.random() - 0.5) * 50;
    
    const zScore = (spread - 500) / 100; // Mock mean/std

    data.push({
      timestamp: format(time, "HH:mm:ss"),
      spread,
      zScore,
      hedgeRatio: 16.5 + (Math.random() - 0.5) * 0.1,
      priceA,
      priceB
    });
  }
  return data;
};

export const generateOrderBook = (basePrice: number): { bids: OrderBookLevel[], asks: OrderBookLevel[] } => {
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  
  let currentBid = basePrice - 1;
  let currentAsk = basePrice + 1;
  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < 15; i++) {
    const bidSize = Math.random() * 2 + 0.1;
    bidTotal += bidSize;
    bids.push({
      price: Number(currentBid.toFixed(2)),
      size: Number(bidSize.toFixed(4)),
      total: Number(bidTotal.toFixed(4))
    });
    currentBid -= Math.random() * 5;

    const askSize = Math.random() * 2 + 0.1;
    askTotal += askSize;
    asks.push({
      price: Number(currentAsk.toFixed(2)),
      size: Number(askSize.toFixed(4)),
      total: Number(askTotal.toFixed(4))
    });
    currentAsk += Math.random() * 5;
  }

  return { bids, asks };
};
