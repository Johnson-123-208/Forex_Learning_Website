import { useState } from 'react';
import { BookOpen, Plus, Trash2, TrendingUp, TrendingDown, Smile, Frown, Meh, AlertCircle, Download } from 'lucide-react';
import { useJournal } from '../hooks/useJournal';
import { motion, AnimatePresence } from 'framer-motion';

const Journal = () => {
  const { trades, addTrade, deleteTrade, getStats } = useJournal();
  const stats = getStats();
  const [showAdd, setShowAdd] = useState(false);
  
  const [newTrade, setNewTrade] = useState({
    pair: 'EUR/USD',
    direction: 'buy',
    entry: '',
    exit: '',
    lots: 0.1,
    profit: '',
    emotion: 'neutral',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrade({
      ...newTrade,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      profit: parseFloat(newTrade.profit)
    });
    setShowAdd(false);
    setNewTrade({ pair: 'EUR/USD', direction: 'buy', entry: '', exit: '', lots: 0.1, profit: '', emotion: 'neutral', notes: '' });
  };

  const exportCSV = () => {
    const headers = ['Date', 'Pair', 'Type', 'Entry', 'Exit', 'Lots', 'Profit', 'Emotion', 'Notes'];
    const rows = trades.map(t => [t.date, t.pair, t.direction, t.entry, t.exit, t.lots, t.profit, t.emotion, t.notes]);
    const content = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading_journal.csv';
    a.click();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <BookOpen className="text-electric w-6 h-6" /> Trading Journal
          </h1>
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Psychology & emotion tracking system.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportCSV} 
            className="btn-secondary px-4 flex items-center gap-2 text-[10px]"
          >
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="btn-primary px-8 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> New Entry
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Win Rate', value: `${stats.winRate}%`, icon: <TrendingUp className="text-green-500" /> },
          { label: 'Total P&L', value: `$${stats.totalPnL.toFixed(2)}`, valueColor: stats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500' },
          { label: 'Profit Factor', value: '1.45', icon: <AlertCircle className="text-gold" /> },
          { label: 'Total Trades', value: stats.totalTrades, icon: <BookOpen className="text-electric" /> }
        ].map((stat, idx) => (
          <div key={idx} className="card py-3 px-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-bold">{stat.label}</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-lg font-bold ${stat.valueColor || 'text-white'}`}>{stat.value}</span>
              <div className="w-3 h-3">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Trades Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-white/40">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Pair</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Lots</th>
                  <th className="px-6 py-4">Emotion</th>
                  <th className="px-6 py-4">Notes</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {trades.map(trade => (
                  <tr key={trade.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-white/60 text-sm">{trade.date}</td>
                    <td className="px-6 py-4 font-bold">{trade.pair}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.direction === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {trade.direction.toUpperCase()}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-mono font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.profit >= 0 ? '+' : ''}${Math.abs(trade.profit).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-white/60">{trade.lots}</td>
                    <td className="px-6 py-4">
                      {trade.emotion === 'happy' && <Smile className="text-green-400 w-5 h-5" />}
                      {trade.emotion === 'sad' && <Frown className="text-red-400 w-5 h-5" />}
                      {trade.emotion === 'neutral' && <Meh className="text-white/40 w-5 h-5" />}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40 max-w-xs truncate">{trade.notes}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteTrade(trade.id)} className="text-white/20 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {trades.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-white/20">
                        <BookOpen className="w-12 h-12" />
                        <p className="italic">Your journal is empty. Log your first trade to see analytics.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Trade Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} zoomIn={{ scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md" 
              onClick={() => setShowAdd(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative card w-full max-w-2xl p-8 bg-navy-light shadow-3xl"
            >
              <h2 className="text-2xl font-bold mb-8">Log New Trade</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Currency Pair</label>
                  <input type="text" value={newTrade.pair} onChange={e => setNewTrade({...newTrade, pair: e.target.value})} className="w-full bg-navy border border-white/10 p-3 rounded-lg outline-none focus:border-electric" placeholder="EUR/USD" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Direction</label>
                  <select value={newTrade.direction} onChange={e => setNewTrade({...newTrade, direction: e.target.value})} className="w-full bg-navy border border-white/10 p-3 rounded-lg outline-none focus:border-electric">
                    <option value="buy">BUY</option>
                    <option value="sell">SELL</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Result ($)</label>
                  <input type="number" step="0.01" value={newTrade.profit} onChange={e => setNewTrade({...newTrade, profit: e.target.value})} className="w-full bg-navy border border-white/10 p-3 rounded-lg outline-none focus:border-electric" placeholder="+150.00" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Lots</label>
                  <input type="number" step="0.01" value={newTrade.lots} onChange={e => setNewTrade({...newTrade, lots: e.target.value})} className="w-full bg-navy border border-white/10 p-3 rounded-lg outline-none focus:border-electric" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Emotional State</label>
                  <div className="flex gap-4">
                    {['happy', 'neutral', 'sad'].map(emo => (
                      <button 
                        key={emo} type="button" 
                        onClick={() => setNewTrade({...newTrade, emotion: emo})}
                        className={`flex-grow p-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${newTrade.emotion === emo ? 'bg-electric/20 border-electric text-white' : 'border-white/10 bg-white/5 text-white/40 hover:bg-white/10'}`}
                      >
                        {emo === 'happy' && <Smile />}
                        {emo === 'neutral' && <Meh />}
                        {emo === 'sad' && <Frown />}
                        <span className="capitalize">{emo}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Notes & Lessons Learned</label>
                  <textarea value={newTrade.notes} onChange={e => setNewTrade({...newTrade, notes: e.target.value})} className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-electric h-32" placeholder="Why did you take this trade? What did you learn?"></textarea>
                </div>
                <div className="col-span-2 flex gap-4 mt-4">
                  <button type="button" onClick={() => setShowAdd(false)} className="flex-grow py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5">Cancel</button>
                  <button type="submit" className="flex-grow py-4 rounded-xl bg-electric font-bold hover:bg-electric-dark shadow-lg shadow-electric/20">Save Journal Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Journal;
