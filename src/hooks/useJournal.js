import { useState, useEffect } from 'react';

export const useJournal = () => {
  const [trades, setTrades] = useState(() => {
    const saved = localStorage.getItem('forex_pro_journal');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('forex_pro_journal', JSON.stringify(trades));
  }, [trades]);

  const addTrade = (trade) => {
    setTrades([trade, ...trades]);
  };

  const deleteTrade = (id) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  const getStats = () => {
    const wins = trades.filter(t => t.profit > 0);
    const losses = trades.filter(t => t.profit <= 0);
    const winRate = trades.length ? Math.round((wins.length / trades.length) * 100) : 0;
    const totalPnL = trades.reduce((acc, t) => acc + t.profit, 0);
    
    return { winRate, totalPnL, totalTrades: trades.length, wins: wins.length, losses: losses.length };
  };

  return { trades, addTrade, deleteTrade, getStats };
};
