import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTradingStore } from '@/store/tradingStore';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

export function OrderPanel() {
  const selectedStock = useTradingStore((state) => state.selectedStock);
  const addOrder = useTradingStore((state) => state.addOrder);
  const funds = useTradingStore((state) => state.funds);
  
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productType, setProductType] = useState('CNC');
  const [orderVariety, setOrderVariety] = useState('LIMIT');
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePlaceOrder = () => {
    if (!selectedStock || !quantity || !price) {
      toast.error('Please fill all required fields');
      return;
    }

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      symbol: selectedStock.symbol,
      type: orderType,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      status: 'COMPLETE' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    addOrder(order);
    setShowConfirm(false);
    setQuantity('');
    setPrice('');
    
    toast.success(`Order placed: ${orderType} ${quantity} ${selectedStock.symbol} @ ₹${price}`);
  };

  if (!selectedStock) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-6 text-center">
        <div>
          <Info className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a stock from Market Watch to place orders</p>
        </div>
      </div>
    );
  }

  const totalAmount = parseInt(quantity || '0') * parseFloat(price || selectedStock.price.toString());
  const margin = totalAmount * 0.2; // 20% margin for example

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
    >
      {/* Stock Info Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{selectedStock.symbol}</h3>
            <p className="text-xs text-muted-foreground">{selectedStock.name}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">₹{selectedStock.price.toFixed(2)}</div>
            <div className={`text-xs ${selectedStock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {selectedStock.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Order Form */}
      <div className="flex-1 overflow-auto">
        <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'BUY' | 'SELL')} className="h-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger 
              value="BUY" 
              className="rounded-none data-[state=active]:bg-success/10 data-[state=active]:text-success data-[state=active]:border-b-2 data-[state=active]:border-success"
            >
              BUY
            </TabsTrigger>
            <TabsTrigger 
              value="SELL" 
              className="rounded-none data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive data-[state=active]:border-b-2 data-[state=active]:border-destructive"
            >
              SELL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="BUY" className="mt-0 p-4 space-y-4">
            <OrderForm
              stock={selectedStock}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              setPrice={setPrice}
              productType={productType}
              setProductType={setProductType}
              orderVariety={orderVariety}
              setOrderVariety={setOrderVariety}
              onSubmit={() => setShowConfirm(true)}
              type="BUY"
              totalAmount={totalAmount}
              margin={margin}
            />
          </TabsContent>

          <TabsContent value="SELL" className="mt-0 p-4 space-y-4">
            <OrderForm
              stock={selectedStock}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              setPrice={setPrice}
              productType={productType}
              setProductType={setProductType}
              orderVariety={orderVariety}
              setOrderVariety={setOrderVariety}
              onSubmit={() => setShowConfirm(true)}
              type="SELL"
              totalAmount={totalAmount}
              margin={margin}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogDescription>
              Review your order details before placing
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 py-4">
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Stock</span>
              <span className="font-semibold">{selectedStock.symbol}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Action</span>
              <span className={`font-semibold ${orderType === 'BUY' ? 'text-success' : 'text-destructive'}`}>
                {orderType}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Quantity</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="font-semibold">₹{price}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Product</span>
              <span className="font-semibold">{productType}</span>
            </div>
            <div className="flex justify-between py-2 pt-3 border-t">
              <span className="font-semibold">Total Amount</span>
              <span className="font-bold text-lg">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePlaceOrder} 
              className={`flex-1 ${orderType === 'BUY' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}`}
            >
              {orderType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

interface OrderFormProps {
  stock: any;
  quantity: string;
  setQuantity: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  productType: string;
  setProductType: (v: string) => void;
  orderVariety: string;
  setOrderVariety: (v: string) => void;
  onSubmit: () => void;
  type: 'BUY' | 'SELL';
  totalAmount: number;
  margin: number;
}

function OrderForm({ 
  stock, 
  quantity, 
  setQuantity, 
  price, 
  setPrice, 
  productType,
  setProductType,
  orderVariety,
  setOrderVariety,
  onSubmit, 
  type,
  totalAmount,
  margin
}: OrderFormProps) {
  return (
    <div className="space-y-5">
      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-xs font-semibold text-muted-foreground uppercase">
          Qty.
        </Label>
        <Input
          id="quantity"
          type="number"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price" className="text-xs font-semibold text-muted-foreground uppercase">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          step="0.05"
          placeholder={stock.price.toFixed(2)}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-11"
        />
        <p className="text-xs text-muted-foreground">LTP: ₹{stock.price.toFixed(2)}</p>
      </div>

      {/* Order Type */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-muted-foreground uppercase">
          Order Type
        </Label>
        <RadioGroup value={orderVariety} onValueChange={setOrderVariety}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LIMIT" id="limit" />
            <Label htmlFor="limit" className="font-normal cursor-pointer">Limit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MARKET" id="market" />
            <Label htmlFor="market" className="font-normal cursor-pointer">Market</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SL" id="sl" />
            <Label htmlFor="sl" className="font-normal cursor-pointer">SL</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Product Type */}
      <div className="space-y-2">
        <Label htmlFor="product" className="text-xs font-semibold text-muted-foreground uppercase">
          Product
        </Label>
        <Select value={productType} onValueChange={setProductType}>
          <SelectTrigger id="product" className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CNC">CNC (Cash & Carry)</SelectItem>
            <SelectItem value="MIS">MIS (Intraday)</SelectItem>
            <SelectItem value="NRML">NRML (Normal)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="p-3 bg-muted/50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Approx. margin</span>
          <span className="font-semibold">₹{margin.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        className={`w-full h-11 font-semibold ${
          type === 'BUY' 
            ? 'bg-success hover:bg-success/90 text-white' 
            : 'bg-destructive hover:bg-destructive/90 text-white'
        }`}
        disabled={!quantity || !price}
      >
        {type}
      </Button>
    </div>
  );
}
