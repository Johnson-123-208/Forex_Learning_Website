import { useState } from 'react';
import { Calculator, ShieldAlert, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
import { calculatePositionSize, calculateMargin } from '../utils/calculators';

const Calculators = () => {
  const [balance, setBalance] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [slPips, setSlPips] = useState(20);
  const [pair, setPair] = useState('EUR/USD');
  const [leverage, setLeverage] = useState(100);
  const [lotsForMargin, setLotsForMargin] = useState(1.0);

  const ps = calculatePositionSize(balance, risk, slPips, pair);
  const margin = calculateMargin(pair, lotsForMargin, leverage);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
             <Calculator className="text-electric w-6 h-6" /> Professional Trading Tools
          </h1>
          <p className="text-white/40 text-xs tracking-wider uppercase font-bold">Precise risk management and margin calculations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Position Size Calculator */}
        <div className="card p-8 border-electric/20 bg-gradient-to-br from-electric/5 to-transparent">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-electric/20 rounded-lg text-electric"><ShieldAlert className="w-4 h-4" /></div>
             <h2 className="text-lg font-bold">Position Size Calculator</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-bold">Account Balance ($)</label>
                <input 
                  type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-electric transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-bold">Risk Ratio (%)</label>
                <input 
                  type="number" step="0.5" value={risk} onChange={(e) => setRisk(Number(e.target.value))}
                  className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-electric transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-bold">Stop Loss (Pips)</label>
              <input 
                type="number" value={slPips} onChange={(e) => setSlPips(Number(e.target.value))}
                className="w-full bg-navy border border-white/10 p-2.5 rounded-lg outline-none focus:border-electric transition-colors text-sm"
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/5 text-center flex flex-col items-center">
               <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Recommended Position Size</span>
               <div className="text-2xl font-mono font-bold text-electric mb-1">{ps} Lots</div>
               <p className="text-[10px] text-white/30 italic">You are risking ${(balance * risk / 100).toLocaleString()} per trade.</p>
            </div>
          </div>
        </div>

        {/* Margin & Pip Value Calculator */}
        <div className="space-y-8">
          <div className="card p-8 border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-gold/20 rounded-xl text-gold"><TrendingUp className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold">Margin Calculator</h2>
            </div>
            
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-bold">Leverage Ratio</label>
                    <select 
                      value={leverage} onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-gold transition-colors"
                    >
                      {[1, 10, 30, 50, 100, 200, 500].map(v => <option key={v} value={v}>1:{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-bold">Trade Lots</label>
                    <input 
                      type="number" step="0.01" value={lotsForMargin} onChange={(e) => setLotsForMargin(Number(e.target.value))}
                      className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-gold transition-colors"
                    />
                  </div>
               </div>
               <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                  <span className="text-sm text-white/40 font-bold uppercase tracking-widest">Margin Required:</span>
                  <span className="text-2xl font-mono font-bold text-gold">${margin.toFixed(2)}</span>
               </div>
            </div>
          </div>

          <div className="card p-8 bg-white/5">
             <div className="flex items-center gap-4 text-white/40">
                <div className="p-3 bg-white/10 rounded-xl"><DollarSign className="w-6 h-6" /></div>
                <div>
                   <h4 className="font-bold text-white uppercase tracking-widest text-xs">Pip Value (Standard Lot)</h4>
                   <p className="text-2xl font-bold text-white/90">$10.00 / Pip</p>
                </div>
             </div>
          </div>
        </div>

        {/* Compound Interest Calculator */}
        <div className="col-span-1 md:col-span-2 card p-8 border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-white/10 rounded-xl text-white"><BarChart2 className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold">Compound Growth Estimator</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-white/20 mb-1 block">Starting Capital</span>
                <span className="text-2xl font-bold">${balance.toLocaleString()}</span>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-white/20 mb-1 block">12 Months (at 5%/mo)</span>
                <span className="text-2xl font-bold text-green-500">${(balance * Math.pow(1.05, 12)).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-white/20 mb-1 block">24 Months (at 5%/mo)</span>
                <span className="text-2xl font-bold text-green-500">${(balance * Math.pow(1.05, 24)).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
             </div>
          </div>
          <p className="text-xs text-white/30 mt-6 italic">* Calculations provided for educational projections only. No specific outcome is guaranteed in trading.</p>
        </div>

      </div>
    </div>
  );
};

export default Calculators;
