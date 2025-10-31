import { useTradingStore } from '@/store/tradingStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketTicker() {
  const marketIndices = useTradingStore((state) => state.marketIndices);

  return (
    <div className="bg-card border-b border-border px-6 py-2">
      <div className="flex items-center gap-6">
        {marketIndices.map((index) => (
          <div key={index.name} className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {index.name}
            </span>
            <span className="text-sm font-bold text-foreground">
              {index.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            <div
              className={`flex items-center gap-1 text-xs ${
                index.change >= 0 ? 'text-success' : 'text-destructive'
              }`}
            >
              {index.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="font-medium">
                {index.change >= 0 ? '+' : ''}
                {index.change.toFixed(2)}
              </span>
              <span className="font-medium">
                ({index.changePercent >= 0 ? '+' : ''}
                {index.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
