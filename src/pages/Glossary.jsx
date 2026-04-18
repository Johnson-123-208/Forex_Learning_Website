import { useState } from 'react';
import { glossary } from '../data/glossary';
import { Search, ChevronRight, Book } from 'lucide-react';

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-4">
           <Book className="text-electric w-12 h-12" /> Forex Glossary
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">Master the language of the markets. A comprehensive list of essential terms for every trader.</p>
        
        <div className="mt-12 relative max-w-xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search for a term (e.g. 'Pip', 'Margin', 'FOMC')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-xl outline-none focus:border-electric/50 transition-all shadow-2xl"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredGlossary.map((item, idx) => (
          <div 
            key={idx}
            className="card p-8 hover:border-electric/30 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-electric mb-3 group-hover:text-white transition-colors">{item.term}</h3>
                <p className="text-white/70 leading-relaxed text-lg">{item.definition}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-electric transition-colors mt-1" />
            </div>
          </div>
        ))}
        {filteredGlossary.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <Search className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl">No terms found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
