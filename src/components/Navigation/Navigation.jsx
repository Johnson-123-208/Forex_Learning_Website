import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Activity, Calculator, Layout, CheckCircle, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-navy/80 backdrop-blur-md border-b border-white/10 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Activity className="h-8 w-8 text-electric group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            ForexLearn <span className="text-electric">Pro</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-electric' : 'text-white/60 hover:text-white'}`}>
            <Layout className="w-4 h-4" /> Dashboard
          </NavLink>
          <NavLink to="/paper-trading" className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-electric' : 'text-white/60 hover:text-white'}`}>
            <Activity className="w-4 h-4" /> Simulator
          </NavLink>
          <NavLink to="/calculators" className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-electric' : 'text-white/60 hover:text-white'}`}>
            <Calculator className="w-4 h-4" /> Tools
          </NavLink>
          <NavLink to="/journal" className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-electric' : 'text-white/60 hover:text-white'}`}>
            <BookOpen className="w-4 h-4" /> Journal
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-electric' : 'text-white/60 hover:text-white'}`}>
            <CheckCircle className="w-4 h-4" /> Progress
          </NavLink>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/dashboard" className="hidden sm:block btn-primary text-sm px-4">
            Start Learning
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-navy-light border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top fill-mode-forwards">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 text-white/60 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/paper-trading" onClick={() => setIsOpen(false)} className="py-2 text-white/60 hover:text-white transition-colors">Simulator</Link>
          <Link to="/calculators" onClick={() => setIsOpen(false)} className="py-2 text-white/60 hover:text-white transition-colors">Tools</Link>
          <Link to="/journal" onClick={() => setIsOpen(false)} className="py-2 text-white/60 hover:text-white transition-colors">Journal</Link>
          <Link to="/progress" onClick={() => setIsOpen(false)} className="py-2 text-white/60 hover:text-white transition-colors">Progress</Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
