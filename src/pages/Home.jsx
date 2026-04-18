import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Zap, BarChart3, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600" 
            alt="Trading Backdrop" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/50 to-navy"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                Master Forex Trading — <br />
                <span className="text-electric">From Zero to Professional</span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto">
                A complete, structured learning path with 16 modules covering everything you need to trade Forex profitably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard" className="btn-primary flex items-center gap-2 group w-full sm:w-auto">
                  Start Learning Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard" className="btn-secondary w-full sm:w-auto">
                  View Course Outline
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "16 Modules", icon: <CheckCircle className="text-electric" /> },
              { label: "200+ Topics", icon: <Globe className="text-gold" /> },
              { label: "Simulator", icon: <Zap className="text-electric" /> },
              { label: "100% Free", icon: <Users className="text-gold" /> }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-white/5 text-xl">{stat.icon}</div>
                <span className="text-lg font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60">Your journey to financial independence in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Learn", desc: "Master technical and fundamental analysis through 16 structured modules.", icon: <BookOpen className="w-10 h-10 text-electric" /> },
              { title: "Practice", desc: "Use our real-time paper trading simulator to test your strategies without risk.", icon: <Activity className="w-10 h-10 text-gold" /> },
              { title: "Trade", desc: "Apply your knowledge in the real markets with confidence and discipline.", icon: <BarChart3 className="w-10 h-10 text-electric" /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="card p-8 text-center"
              >
                <div className="mb-6 inline-block p-4 bg-white/5 rounded-2xl">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Traders Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Junior Trader", text: "This course took me from having zero knowledge to placing my first trades with confidence. The simulator is a game changer!" },
              { name: "Sarah Smith", role: "Full-time Trader", text: "The Smart Money Concepts module explained things I've been struggling with for years. Best free resource out there." },
              { name: "Mike Johnson", role: "Part-time Trader", text: "Structured, clear, and professional. The calculators and journal helped me finally get disciplined." }
            ].map((t, idx) => (
              <div key={idx} className="card p-6 border-electric/20">
                <p className="italic text-white/80 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center font-bold text-electric">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 mt-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-electric" />
            <span className="font-bold">ForexLearn Pro</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <Link to="/glossary" className="hover:text-white">Glossary</Link>
            <Link to="/resources" className="hover:text-white">Resources</Link>
            <Link to="/journal" className="hover:text-white">Journal</Link>
          </div>
          <p className="text-sm text-white/30">&copy; 2026 ForexLearn Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const BookOpen = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const Activity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default Home;
