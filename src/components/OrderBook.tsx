import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

export function OrderBook() {
  // Mock data for order book
  const bids: OrderBookEntry[] = [
    { price: 18524.50, quantity: 125, total: 2315562 },
    { price: 18524.25, quantity: 89, total: 1648658 },
    { price: 18524.00, quantity: 156, total: 2889744 },
    { price: 18523.75, quantity: 203, total: 3760321 },
    { price: 18523.50, quantity: 167, total: 3093425 },
    { price: 18523.25, quantity: 94, total: 1741186 },
    { price: 18523.00, quantity: 178, total: 3297094 },
    { price: 18522.75, quantity: 145, total: 2685799 },
  ];

  const asks: OrderBookEntry[] = [
    { price: 18525.00, quantity: 142, total: 2630550 },
    { price: 18525.25, quantity: 98, total: 1815475 },
    { price: 18525.50, quantity: 165, total: 3056708 },
    { price: 18525.75, quantity: 187, total: 3464315 },
    { price: 18526.00, quantity: 134, total: 2482484 },
    { price: 18526.25, quantity: 176, total: 3260620 },
    { price: 18526.50, quantity: 159, total: 2945714 },
    { price: 18526.75, quantity: 121, total: 2241737 },
  ];

  return (
    <div className="h-full border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Order Book</h3>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 text-xs font-medium text-muted-foreground border-b border-border">
        <div className="text-left">Price</div>
        <div className="text-right">Qty</div>
        <div className="text-right">Total</div>
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        {/* Bids Section */}
        <div className="p-2">
          <div className="text-xs font-medium text-success mb-2 px-1">Bids</div>
          {bids.map((bid, index) => (
            <motion.div
              key={`bid-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-3 gap-2 py-1.5 px-1 hover:bg-success/5 rounded text-xs relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-success/10"
                style={{ 
                  width: `${(bid.quantity / 250) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
              <div className="text-success font-medium relative z-10">₹{bid.price.toFixed(2)}</div>
              <div className="text-right relative z-10">{bid.quantity}</div>
              <div className="text-right text-muted-foreground relative z-10">{bid.total.toLocaleString()}</div>
            </motion.div>
          ))}
        </div>

        {/* Spread */}
        <div className="py-2 px-3 bg-muted/30 border-y border-border">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Spread</span>
            <span className="font-medium">₹0.50 (0.003%)</span>
          </div>
        </div>

        {/* Asks Section */}
        <div className="p-2">
          <div className="text-xs font-medium text-destructive mb-2 px-1">Asks</div>
          {asks.map((ask, index) => (
            <motion.div
              key={`ask-${index}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-3 gap-2 py-1.5 px-1 hover:bg-destructive/5 rounded text-xs relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-destructive/10"
                style={{ 
                  width: `${(ask.quantity / 250) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
              <div className="text-destructive font-medium relative z-10">₹{ask.price.toFixed(2)}</div>
              <div className="text-right relative z-10">{ask.quantity}</div>
              <div className="text-right text-muted-foreground relative z-10">{ask.total.toLocaleString()}</div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
