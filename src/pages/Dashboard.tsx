import { motion } from 'framer-motion';
import { useTradingStore } from '@/store/tradingStore';
import { useLivePrices } from '@/hooks/useLivePrices';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, TrendingUp, Wallet, PieChart, Activity } from 'lucide-react';
import { MarketWatch } from '@/components/MarketWatch';
import { OrderBook } from '@/components/OrderBook';
import { ChartPanel } from '@/components/ChartPanel';
import { OrderPanel } from '@/components/OrderPanel';

export default function Dashboard() {
  // Enable live price updates
  useLivePrices();
  const { positions, funds, orders } = useTradingStore();

  const totalPnL = positions.reduce((acc, pos) => acc + pos.pnl, 0);
  const totalPnLPercent = positions.reduce((acc, pos) => acc + pos.pnlPercent, 0) / positions.length;

  const stats = [
    {
      title: 'Total P&L',
      value: `₹${totalPnL.toLocaleString()}`,
      change: `${totalPnLPercent.toFixed(2)}%`,
      positive: totalPnL >= 0,
      icon: TrendingUp,
    },
    {
      title: 'Available Funds',
      value: `₹${funds.available.toLocaleString()}`,
      change: `${((funds.available / funds.total) * 100).toFixed(1)}%`,
      positive: true,
      icon: Wallet,
    },
    {
      title: 'Portfolio Value',
      value: `₹${(funds.used + totalPnL).toLocaleString()}`,
      change: `${((totalPnL / funds.used) * 100).toFixed(2)}%`,
      positive: totalPnL >= 0,
      icon: PieChart,
    },
    {
      title: 'Active Positions',
      value: positions.length.toString(),
      change: 'Open',
      positive: true,
      icon: Activity,
    },
  ];

  return (
    <div className="h-screen flex">
      {/* Market Watch - Left Sidebar */}
      <div className="w-64 flex-shrink-0">
        <MarketWatch />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Stats Cards */}
        <div className="p-6 border-b border-border bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.positive ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chart, Order Book and Order Panel */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 border-r border-border">
            <ChartPanel />
          </div>
          <div className="hidden xl:block w-64 flex-shrink-0 border-r border-border overflow-y-auto">
            <OrderBook />
          </div>
          <div className="w-80 flex-shrink-0 overflow-y-auto">
            <OrderPanel />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="border-t border-border bg-card p-4">
          <h3 className="font-semibold mb-3">Recent Orders</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.symbol}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.type === 'BUY'
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {order.type}
                    </span>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === 'COMPLETE'
                          ? 'bg-success/10 text-success'
                          : order.status === 'PENDING'
                          ? 'bg-yellow-500/10 text-yellow-600'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
