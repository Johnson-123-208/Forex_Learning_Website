import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const InfoBox = ({ children, title = "Did You Know?" }) => (
  <div className="my-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
    <div className="shrink-0"><Info className="text-blue-400 w-6 h-6" /></div>
    <div>
      <h4 className="font-bold text-blue-400 mb-2 uppercase text-xs tracking-widest">{title}</h4>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </div>
  </div>
);

export const TipBox = ({ children, title = "Pro Tip" }) => (
  <div className="my-8 p-6 rounded-xl bg-green-500/10 border border-green-500/20 flex gap-4">
    <div className="shrink-0"><Lightbulb className="text-green-400 w-6 h-6" /></div>
    <div>
      <h4 className="font-bold text-green-400 mb-2 uppercase text-xs tracking-widest">{title}</h4>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </div>
  </div>
);

export const WarningBox = ({ children, title = "Common Mistake" }) => (
  <div className="my-8 p-6 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4">
    <div className="shrink-0"><AlertTriangle className="text-red-400 w-6 h-6" /></div>
    <div>
      <h4 className="font-bold text-red-400 mb-2 uppercase text-xs tracking-widest">{title}</h4>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </div>
  </div>
);

export const Takeaways = ({ items }) => (
  <div className="my-12 card p-8 border-electric/30 bg-electric/5">
    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
      <CheckCircle2 className="text-electric" /> Key Takeaways
    </h3>
    <ul className="space-y-4">
      {items.map((item, id) => (
        <li key={id} className="flex gap-3 text-white/80">
          <span className="text-electric font-bold">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);
