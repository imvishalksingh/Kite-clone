import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTradingStore } from '@/store/tradingStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { toast } from 'sonner';

export default function Funds() {
  const funds = useTradingStore((state) => state.funds);
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    if (amount && parseFloat(amount) > 0) {
      toast.success(`₹${parseFloat(amount).toLocaleString()} added successfully`);
      setAmount('');
    }
  };

  const handleWithdraw = () => {
    if (amount && parseFloat(amount) > 0) {
      toast.success(`₹${parseFloat(amount).toLocaleString()} withdrawal initiated`);
      setAmount('');
    }
  };

  const usedPercent = (funds.used / funds.total) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6">Funds</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funds Overview */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Funds Overview</h2>
                <p className="text-sm text-muted-foreground">Manage your trading funds</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Funds</span>
                  <span className="font-semibold">₹{funds.total.toLocaleString()}</span>
                </div>
                <div className="text-3xl font-bold text-primary mb-4">
                  ₹{funds.total.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="font-semibold text-success">₹{funds.available.toLocaleString()}</span>
                </div>
                <Progress value={(funds.available / funds.total) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Used</span>
                  <span className="font-semibold text-destructive">₹{funds.used.toLocaleString()}</span>
                </div>
                <Progress value={usedPercent} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Add/Withdraw Funds */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Manage Funds</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddFunds}
                  className="bg-success hover:bg-success/90"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
                
                <Button
                  onClick={handleWithdraw}
                  variant="outline"
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > funds.available}
                >
                  <ArrowUpFromLine className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>

              <div className="p-4 bg-muted rounded-lg mt-6">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[10000, 25000, 50000].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                    >
                      ₹{(preset / 1000).toFixed(0)}K
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { type: 'ADD', amount: 100000, date: '2025-10-28', status: 'Success' },
              { type: 'WITHDRAW', amount: 25000, date: '2025-10-25', status: 'Success' },
              { type: 'ADD', amount: 50000, date: '2025-10-20', status: 'Success' },
            ].map((txn, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${txn.type === 'ADD' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {txn.type === 'ADD' ? (
                      <ArrowDownToLine className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpFromLine className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{txn.type === 'ADD' ? 'Funds Added' : 'Withdrawal'}</div>
                    <div className="text-sm text-muted-foreground">{txn.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${txn.type === 'ADD' ? 'text-success' : 'text-destructive'}`}>
                    {txn.type === 'ADD' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{txn.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
