import { motion } from 'framer-motion';
import { useTradingStore, Stock } from '@/store/tradingStore';
import { ArrowUp, ArrowDown, Trash2, Filter, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MarketWatch() {
  const watchlist = useTradingStore((state) => state.watchlist);
  const selectedStock = useTradingStore((state) => state.selectedStock);
  const setSelectedStock = useTradingStore((state) => state.setSelectedStock);
  const removeFromWatchlist = useTradingStore((state) => state.removeFromWatchlist);
  const searchQuery = useTradingStore((state) => state.searchQuery);
  const setSearchQuery = useTradingStore((state) => state.setSearchQuery);

  // Filter watchlist based on search query
  const filteredWatchlist = watchlist.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="h-full border-r border-border bg-card">
      <div className="p-4 border-b border-border space-y-3">
        {/* Search with Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Stocks</DropdownMenuItem>
              <DropdownMenuItem>Gainers</DropdownMenuItem>
              <DropdownMenuItem>Losers</DropdownMenuItem>
              <DropdownMenuItem>Most Active</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Watchlist Count and Groups */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            MarketWatchlist <span className="font-medium text-foreground">{filteredWatchlist.length}/{watchlist.length}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                <Users className="h-3 w-3" />
                <span className="text-xs">Groups</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem>Tech Stocks</DropdownMenuItem>
              <DropdownMenuItem>Banking</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-2">
          {filteredWatchlist.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 text-sm">
              {searchQuery ? 'No stocks found' : 'No stocks in watchlist'}
            </div>
          ) : (
            filteredWatchlist.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative group p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                  selectedStock?.symbol === stock.symbol
                    ? 'bg-primary/10 border border-primary'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div onClick={() => handleStockClick(stock)} className="pr-8">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1 min-w-0 mr-2">
                      <div className="font-semibold text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {stock.name}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-sm whitespace-nowrap">₹{stock.price.toFixed(2)}</div>
                      <div
                        className={`flex items-center gap-1 text-xs justify-end ${
                          stock.change >= 0 ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {stock.change >= 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(stock.symbol);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
