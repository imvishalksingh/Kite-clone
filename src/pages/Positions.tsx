import { motion } from 'framer-motion';
import { useTradingStore } from '@/store/tradingStore';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function Positions() {
  const positions = useTradingStore((state) => state.positions);
  
  const totalPnL = positions.reduce((acc, pos) => acc + pos.pnl, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Positions</h1>
          <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
            Total P&L: ₹{totalPnL.toLocaleString()}
          </div>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>LTP</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>P&L %</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position, index) => (
                <motion.tr
                  key={position.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{position.symbol}</TableCell>
                  <TableCell>{position.quantity}</TableCell>
                  <TableCell>₹{position.avgPrice.toFixed(2)}</TableCell>
                  <TableCell>₹{position.ltp.toFixed(2)}</TableCell>
                  <TableCell className={position.pnl >= 0 ? 'text-success' : 'text-destructive'}>
                    ₹{position.pnl.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {position.pnl >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {position.pnlPercent.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Exit
                    </Button>
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
