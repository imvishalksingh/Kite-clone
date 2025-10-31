import { useEffect } from 'react';
import { useTradingStore } from '@/store/tradingStore';

// Hook to simulate live price updates
export function useLivePrices() {
  const updateStockPrice = useTradingStore((state) => state.updateStockPrice);
  const updateMarketIndex = useTradingStore((state) => state.updateMarketIndex);
  const watchlist = useTradingStore((state) => state.watchlist);
  const marketIndices = useTradingStore((state) => state.marketIndices);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly select a stock to update
      const randomIndex = Math.floor(Math.random() * watchlist.length);
      const stock = watchlist[randomIndex];
      
      if (stock) {
        // Generate random price change (-2% to +2%)
        const changePercent = (Math.random() - 0.5) * 4;
        const change = (stock.price * changePercent) / 100;
        const newPrice = stock.price + change;
        
        updateStockPrice(stock.symbol, newPrice, change);
      }

      // Update market indices
      const randomIndexIdx = Math.floor(Math.random() * marketIndices.length);
      const index = marketIndices[randomIndexIdx];
      
      if (index) {
        // Generate random change (-1% to +1%)
        const changePercent = (Math.random() - 0.5) * 2;
        const change = (index.value * changePercent) / 100;
        const newValue = index.value + change;
        
        updateMarketIndex(index.name, newValue, change);
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [watchlist, marketIndices, updateStockPrice, updateMarketIndex]);
}
