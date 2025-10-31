import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTradingStore } from '@/store/tradingStore';
import { generateMockChartData, CandlestickData } from '@/data/mockChartData';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown } from 'lucide-react';

const CustomCandlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  const isGreen = close >= open;
  const color = isGreen ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
  
  const yHigh = y - ((high - close) / (high - low)) * height;
  const yLow = y + ((open - low) / (high - low)) * height;
  const candleY = isGreen ? y - ((close - open) / (high - low)) * height : y;
  const candleHeight = Math.abs(((close - open) / (high - low)) * height);

  return (
    <g>
      <line x1={x + width / 2} y1={yHigh} x2={x + width / 2} y2={yLow} stroke={color} strokeWidth={1} />
      <rect x={x} y={candleY} width={width} height={candleHeight || 1} fill={color} stroke={color} />
    </g>
  );
};

export function ChartPanel() {
  const selectedStock = useTradingStore((state) => state.selectedStock);
  const [timeframe, setTimeframe] = useState('1D');
  
  const chartData = useMemo(
    () => generateMockChartData(selectedStock?.price || 2400),
    [selectedStock]
  );

  if (!selectedStock) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">Select a stock to view chart</p>
          <p className="text-sm">Click on any stock from the market watch</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Stock header */}
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-bold">{selectedStock.symbol}</h2>
            <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">₹{selectedStock.price.toFixed(2)}</div>
            <div
              className={`flex items-center gap-1 justify-end ${
                selectedStock.change >= 0 ? 'text-success' : 'text-destructive'
              }`}
            >
              {selectedStock.change >= 0 ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="font-semibold">
                {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe selector */}
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList className="bg-muted">
            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
              <TabsTrigger key={tf} value={tf} className="text-xs">
                {tf}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              domain={['dataMin - 20', 'dataMax + 20']}
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            />
            <Bar dataKey="high" shape={<CustomCandlestick />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
