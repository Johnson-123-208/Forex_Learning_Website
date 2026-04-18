import { Globe, ExternalLink, ShieldCheck, Newspaper, BarChart2 } from 'lucide-react';

const resources = [
  { category: "Market News & Calendars", links: [
    { name: "Forex Factory", url: "https://www.forexfactory.com", desc: "Best-in-class economic calendar and news." },
    { name: "Investing.com", url: "https://www.investing.com", desc: "Real-time quotes and global financial news." },
    { name: "FXStreet", url: "https://www.fxstreet.com", desc: "Live analysis and webinars." }
  ]},
  { category: "Charting & Tools", links: [
    { name: "TradingView", url: "https://www.tradingview.com", desc: "The standard for modern charting and social trading." },
    { name: "MetaTrader 4/5", url: "https://www.metatrader4.com", desc: "Industry standard trading platforms." },
    { name: "Myfxbook", url: "https://www.myfxbook.com", desc: "Professional journal and correlation tools." }
  ]},
  { category: "Educational Communities", links: [
    { name: "BabyPips", url: "https://www.babypips.com", desc: "Excellent beginner resources and forums." },
    { name: "Bloomberg Markets", url: "https://www.bloomberg.com/markets", desc: "High-level institutional finance news." }
  ]}
];

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
       <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Trading Toolbox & Resources</h1>
        <p className="text-white/60">The websites and platforms used by professional traders every single day.</p>
      </div>

      <div className="grid gap-12">
        {resources.map((cat, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-electric rounded-full"></span>
              {cat.category}
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {cat.links.map((link, lIdx) => (
                <a 
                  key={lIdx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-6 flex flex-col justify-between hover:border-electric/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-xl font-bold group-hover:text-electric transition-colors">{link.name}</h3>
                       <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-electric" />
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 card p-12 text-center bg-gradient-to-br from-electric/20 to-transparent border-electric/30">
         <ShieldCheck className="w-16 h-16 text-electric mx-auto mb-6" />
         <h2 className="text-3xl font-bold mb-4">A Warning on Brokers</h2>
         <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
           Never use an unregulated broker. Look for regulation from first-tier bodies like the <strong>FCA (UK)</strong>, <strong>ASIC (Australia)</strong>, or <strong>NFA/CFTC (USA)</strong>. Your capital safety is your first priority.
         </p>
         <button onClick={() => window.scrollTo(0, 0)} className="btn-primary">Back to Top</button>
      </div>
    </div>
  );
};

export default Resources;
