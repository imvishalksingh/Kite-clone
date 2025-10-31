// Trading store using Zustand for state management
import { create } from 'zustand';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
  pnlPercent: number;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  currentValue: number;
  investmentValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'COMPLETE' | 'PENDING' | 'REJECTED';
  time: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface TradingState {
  watchlist: Stock[];
  positions: Position[];
  holdings: Holding[];
  orders: Order[];
  marketIndices: MarketIndex[];
  selectedStock: Stock | null;
  sidebarOpen: boolean;
  searchQuery: string;
  funds: {
    available: number;
    used: number;
    total: number;
  };
  setSelectedStock: (stock: Stock) => void;
  addOrder: (order: Order) => void;
  updateStockPrice: (symbol: string, price: number, change: number) => void;
  updateMarketIndex: (name: string, value: number, change: number) => void;
  toggleSidebar: () => void;
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useTradingStore = create<TradingState>((set) => ({
  watchlist: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 45.30, changePercent: 1.88, volume: '12.5M', marketCap: '16.6T' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3587.90, change: -23.45, changePercent: -0.65, volume: '8.2M', marketCap: '13.1T' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1456.30, change: 18.75, changePercent: 1.30, volume: '15.3M', marketCap: '6.0T' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1645.25, change: -12.80, changePercent: -0.77, volume: '9.8M', marketCap: '9.1T' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.50, change: 8.45, changePercent: 0.86, volume: '11.2M', marketCap: '6.9T' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 598.70, change: 12.30, changePercent: 2.10, volume: '25.6M', marketCap: '5.3T' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 876.45, change: -5.60, changePercent: -0.63, volume: '7.4M', marketCap: '5.0T' },
    { symbol: 'ITC', name: 'ITC Limited', price: 432.80, change: 6.70, changePercent: 1.57, volume: '18.9M', marketCap: '5.4T' },
  ],
  positions: [
    { symbol: 'RELIANCE', quantity: 50, avgPrice: 2400.00, ltp: 2456.75, pnl: 2837.50, pnlPercent: 2.37 },
    { symbol: 'TCS', quantity: 25, avgPrice: 3620.00, ltp: 3587.90, pnl: -802.50, pnlPercent: -0.89 },
    { symbol: 'INFY', quantity: 100, avgPrice: 1440.00, ltp: 1456.30, pnl: 1630.00, pnlPercent: 1.13 },
  ],
  holdings: [
    { symbol: 'HDFCBANK', quantity: 75, avgPrice: 1580.00, ltp: 1645.25, currentValue: 123393.75, investmentValue: 118500.00, pnl: 4893.75, pnlPercent: 4.13 },
    { symbol: 'ICICIBANK', quantity: 150, avgPrice: 945.00, ltp: 987.50, currentValue: 148125.00, investmentValue: 141750.00, pnl: 6375.00, pnlPercent: 4.50 },
    { symbol: 'SBIN', quantity: 200, avgPrice: 580.00, ltp: 598.70, currentValue: 119740.00, investmentValue: 116000.00, pnl: 3740.00, pnlPercent: 3.22 },
  ],
  orders: [
    { id: '001', symbol: 'RELIANCE', type: 'BUY', quantity: 10, price: 2456.75, status: 'COMPLETE', time: '10:45 AM' },
    { id: '002', symbol: 'TCS', type: 'SELL', quantity: 5, price: 3587.90, status: 'COMPLETE', time: '11:20 AM' },
    { id: '003', symbol: 'INFY', type: 'BUY', quantity: 20, price: 1456.30, status: 'PENDING', time: '12:05 PM' },
  ],
  marketIndices: [
    { name: 'NIFTY 50', value: 26084.70, change: 148.50, changePercent: 0.57 },
    { name: 'SENSEX', value: 85050.61, change: 422.45, changePercent: 0.50 },
  ],
  selectedStock: null,
  sidebarOpen: true,
  searchQuery: '',
  funds: {
    available: 250000,
    used: 750000,
    total: 1000000,
  },
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateStockPrice: (symbol, price, change) =>
    set((state) => ({
      watchlist: state.watchlist.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, price, change, changePercent: (change / (price - change)) * 100 }
          : stock
      ),
    })),
  updateMarketIndex: (name, value, change) =>
    set((state) => ({
      marketIndices: state.marketIndices.map((index) =>
        index.name === name
          ? { ...index, value, change, changePercent: (change / (value - change)) * 100 }
          : index
      ),
    })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addToWatchlist: (stock) =>
    set((state) => ({
      watchlist: state.watchlist.some((s) => s.symbol === stock.symbol)
        ? state.watchlist
        : [...state.watchlist, stock],
    })),
  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((stock) => stock.symbol !== symbol),
      selectedStock: state.selectedStock?.symbol === symbol ? null : state.selectedStock,
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
