// Mock candlestick chart data
export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const generateMockChartData = (basePrice: number = 2400): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 50;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    
    data.push({
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    });
    
    currentPrice = close;
  }
  
  return data;
};
