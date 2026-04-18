import { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle } from 'recharts';
import { Activity, LayoutGrid, ArrowDownCircle, ArrowUpCircle, Info, Calculator, ShieldCheck } from 'lucide-react';
import { simulatePriceMovement, generateCandlestickData } from '../utils/simulator';
import { motion, AnimatePresence } from 'framer-motion';

const CURRENCY_PAIRS = [
  { symbol: 'EUR/USD', price: 1.08520, pip: 0.0001 },
  { symbol: 'GBP/USD', price: 1.26450, pip: 0.0001 },
  { symbol: 'USD/JPY', price: 151.420, pip: 0.01 },
  { symbol: 'AUD/USD', price: 0.65420, pip: 0.0001 },
  { symbol: 'USD/CAD', price: 1.35620, pip: 0.0001 }
];

const PaperTrading = () => {
  const [balance, setBalance] = useState(10000);
  const [selectedPair, setSelectedPair] = useState(CURRENCY_PAIRS[0]);
  const [currentPrice, setCurrentPrice] = useState(selectedPair.price);
  const [chartData, setChartData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);
  const [lots, setLots] = useState(0.1);
  const [leverage, setLeverage] = useState(100);
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');

  // Initial Chart Data
  useEffect(() => {
    setChartData(generateCandlestickData(selectedPair.price));
  }, [selectedPair]);

  // Price Simulation Feed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prevPrice) => {
        const nextPrice = simulatePriceMovement(prevPrice);
        setChartData((prevData) => {
          const lastCandle = prevData[prevData.length - 1];
          const newCandle = { ...lastCandle, close: nextPrice };
          if (nextPrice > newCandle.high) newCandle.high = nextPrice;
          if (nextPrice < newCandle.low) newCandle.low = nextPrice;
          return [...prevData.slice(0, -1), newCandle];
        });
        return nextPrice;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = (direction) => {
    const position = {
      id: Date.now(),
      pair: selectedPair.symbol,
      direction,
      entry: currentPrice,
      lots,
      sl: sl ? parseFloat(sl) : null,
      tp: tp ? parseFloat(tp) : null,
      openTime: new Date().toLocaleTimeString()
    };
    setPositions([...positions, position]);
    setSl('');
    setTp('');
  };

  const closePosition = (id) => {
    const pos = positions.find(p => p.id === id);
    const profit = calculatePnL(pos);
    setBalance(prev => prev + profit);
    setHistory([{ ...pos, closePrice: currentPrice, profit, closeTime: new Date().toLocaleTimeString() }, ...history]);
    setPositions(positions.filter(p => p.id !== id));
  };

  const calculatePnL = (pos) => {
    const multiplier = pos.direction === 'buy' ? 1 : -1;
    const isJpy = pos.pair.includes('JPY');
    const pips = (currentPrice - pos.entry) * (isJpy ? 100 : 10000);
    const pipValue = 10; // Standard approximation
    return pips * multiplier * (pos.lots * 10);
  };

  const equity = useMemo(() => {
    const unrealized = positions.reduce((acc, pos) => acc + calculatePnL(pos), 0);
    return balance + unrealized;
  }, [balance, positions, currentPrice]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Account Summary Stats */}
        <header className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {[
            { label: 'Balance', value: `$${balance.toLocaleString()}`, color: 'text-white' },
            { label: 'Equity', value: `$${equity.toFixed(2)}`, color: 'text-electric' },
            { label: 'Unrealized P&L', value: `$${(equity - balance).toFixed(2)}`, color: equity >= balance ? 'text-green-500' : 'text-red-500' },
            { label: 'Free Margin', value: `$${(equity * 0.9).toFixed(2)}`, color: 'text-white/40' }
          ].map((stat, idx) => (
            <div key={idx} className="card py-3 px-4 bg-white/5 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">{stat.label}</span>
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </header>

        {/* Chart Area */}
        <section className="col-span-12 lg:col-span-8 card p-6 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <select 
                value={selectedPair.symbol} 
                onChange={(e) => setSelectedPair(CURRENCY_PAIRS.find(p => p.symbol === e.target.value))}
                className="bg-navy-light border border-white/10 rounded p-1.5 text-base font-bold outline-none cursor-pointer hover:border-electric/50 transition-colors"
              >
                {CURRENCY_PAIRS.map(p => <option key={p.symbol} value={p.symbol}>{p.symbol}</option>)}
              </select>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Live Price</span>
                <span className={`text-xl font-mono font-bold ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                  {currentPrice.toFixed(5)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 rounded text-xs">M1</span>
              <span className="px-3 py-1 bg-electric/20 text-electric rounded text-xs">M5</span>
              <span className="px-3 py-1 bg-white/5 rounded text-xs">H1</span>
            </div>
          </div>

          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis 
                   domain={['auto', 'auto']} 
                   stroke="rgba(255,255,255,0.2)" 
                   orientation="right" 
                   fontSize={10} 
                   axisLine={false} 
                   tickLine={false}
                   tickFormatter={(v) => v.toFixed(4)}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar 
                  dataKey="close" 
                  fill="#1e90ff"
                  shape={(props) => {
                    const { x, y, width, height, open, close, high, low } = props;
                    const isBullish = close >= open;
                    const fill = isBullish ? '#22c55e' : '#ef4444';
                    return (
                      <g>
                        {/* Wicks */}
                        <line x1={x + width / 2} y1={y + height} x2={x + width / 2} y2={y} stroke={fill} strokeWidth={1} />
                        {/* Body */}
                        <Rectangle {...props} fill={fill} />
                      </g>
                    );
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Order Panel */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="card p-6 border-electric/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-electric" /> Executive Order
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-white/40 block mb-2 font-bold uppercase tracking-widest">Lot Size</label>
                <div className="flex items-center justify-between gap-4">
                  {[0.01, 0.1, 1.0].map(val => (
                    <button 
                      key={val} 
                      onClick={() => setLots(val)}
                      className={`flex-grow py-2 rounded-lg border border-white/10 ${lots === val ? 'bg-electric text-white border-electric' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      {val}
                    </button>
                  ))}
                  <input 
                    type="number" value={lots} onChange={(e) => setLots(Number(e.target.value))}
                    className="w-20 bg-white/5 border border-white/10 rounded-lg p-2 text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 block mb-2 font-bold uppercase tracking-widest">Stop Loss (Price)</label>
                  <input 
                    type="number" step="0.0001" value={sl} onChange={(e) => setSl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2 font-bold uppercase tracking-widest">Take Profit (Price)</label>
                  <input 
                    type="number" step="0.0001" value={tp} onChange={(e) => setTp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                 onClick={() => handleTrade('buy')}
                 className="flex-grow py-4 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <ArrowUpCircle className="w-8 h-8 text-green-500 mb-1 group-hover:scale-110" />
                    <span className="text-lg font-bold">BUY</span>
                  </div>
                </button>
                <button 
                 onClick={() => handleTrade('sell')}
                 className="flex-grow py-4 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <ArrowDownCircle className="w-8 h-8 text-red-500 mb-1 group-hover:scale-110" />
                    <span className="text-lg font-bold">SELL</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Tips Panel */}
          <div className="card p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
            <h4 className="flex items-center gap-2 font-bold mb-4 text-gold">
              <ShieldCheck className="w-5 h-5" /> Trading Tip
            </h4>
            <p className="text-sm text-white/70 leading-relaxed italic">
              "Never risk more than 1% of your account on a single trade. Managing your capital is just as important as reading the charts."
            </p>
          </div>
        </section>

        {/* Positions Table */}
        <section className="col-span-12 card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4" /> Open Positions ({positions.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase tracking-widest text-white/40 bg-white/5">
                <tr>
                  <th className="px-6 py-4">Symbol</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Entry</th>
                  <th className="px-6 py-4">Lots</th>
                  <th className="px-6 py-4">Profit/Loss</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {positions.map(pos => {
                    const profit = calculatePnL(pos);
                    return (
                      <motion.tr 
                        key={pos.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold">{pos.pair}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pos.direction === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {pos.direction.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono">{pos.entry.toFixed(5)}</td>
                        <td className="px-6 py-4">{pos.lots}</td>
                        <td className={`px-6 py-4 font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${profit.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => closePosition(pos.id)}
                            className="text-xs font-bold text-white/40 hover:text-white transition-colors"
                          >
                            Close Order
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                {positions.length === 0 && (
                  <tr><td colSpan="6" className="px-6 py-12 text-center text-white/20 italic">No open positions</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaperTrading;
