import { motion } from 'framer-motion';
import { useTradingStore } from '@/store/tradingStore';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function Holdings() {
  const holdings = useTradingStore((state) => state.holdings);
  
  const totalInvestment = holdings.reduce((acc, h) => acc + h.investmentValue, 0);
  const totalCurrentValue = holdings.reduce((acc, h) => acc + h.currentValue, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = (totalPnL / totalInvestment) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6">Holdings</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Investment</div>
            <div className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Current Value</div>
            <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total P&L</div>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
              ₹{totalPnL.toLocaleString()}
            </div>
            <div className={`flex items-center gap-1 text-sm mt-1 ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalPnL >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {totalPnLPercent.toFixed(2)}%
            </div>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>LTP</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>P&L %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding, index) => (
                <motion.tr
                  key={holding.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{holding.symbol}</TableCell>
                  <TableCell>{holding.quantity}</TableCell>
                  <TableCell>₹{holding.avgPrice.toFixed(2)}</TableCell>
                  <TableCell>₹{holding.ltp.toFixed(2)}</TableCell>
                  <TableCell>₹{holding.investmentValue.toLocaleString()}</TableCell>
                  <TableCell>₹{holding.currentValue.toLocaleString()}</TableCell>
                  <TableCell className={holding.pnl >= 0 ? 'text-success' : 'text-destructive'}>
                    ₹{holding.pnl.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${holding.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {holding.pnl >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {holding.pnlPercent.toFixed(2)}%
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
}
