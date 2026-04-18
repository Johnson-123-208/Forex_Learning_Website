import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { modules } from '../data/modules-full';
import { useProgress } from '../hooks/useProgress';
import { ChevronRight, Lock, CheckCircle2, Trophy, Clock, BarChart, BookOpen, TrendingUp, Globe, Monitor, CandlestickChart, LayoutGrid, Ruler, Shield, LineChart, Newspaper, Percent, Brain, Swords, Layers, Zap, Briefcase, Building2 } from 'lucide-react';

const iconMap = {
  BookOpen, TrendingUp, Globe, Monitor, CandlestickChart, LayoutGrid, Ruler, Shield, LineChart, Newspaper, Percent, Brain, Swords, Layers, Zap, Briefcase, Building2
};

const Dashboard = () => {
  const { progress, getModuleProgress, overallProgress } = useProgress();
  const overall = overallProgress();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-xl font-bold mb-1">My Learning Dashboard</h1>
            <p className="text-white/40 text-xs">Track your progress and continue your journey to mastery.</p>
          </div>
          <div className="card p-4 flex items-center gap-6 min-w-[280px]">
            <div className="w-16 h-16 rounded-full border-4 border-electric/20 flex items-center justify-center relative">
              <span className="text-lg font-bold">{overall}%</span>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  fill="none" stroke="currentColor" strokeWidth="4"
                  className="text-electric"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - overall / 100)}`}
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Overall Progress</p>
              <h3 className="text-lg font-bold">Trading Apprentice</h3>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="card p-8 bg-gradient-to-r from-electric/10 to-transparent border-electric/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-20 h-20 bg-electric/20 rounded-2xl items-center justify-center">
              <BarChart className="w-10 h-10 text-electric" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-0.5">Continue where you left off</h2>
              <p className="text-white/40 text-xs">Module 1: Introduction to Forex Trading • Lesson 1.2</p>
            </div>
          </div>
          <Link to="/module/1/lesson/1.1" className="btn-primary flex items-center gap-2 group whitespace-nowrap">
            Resume Learning <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module, idx) => {
          const moduleProgress = getModuleProgress(module.id, module.lessonCount);
          const isLocked = !progress.forceUnlockAll && idx > 0 && !progress.completedModules.includes(modules[idx - 1].id);
          const isUnlocked = !isLocked;
          const isCompleted = progress.completedModules.includes(module.id);
          const Icon = iconMap[module.icon] || BookOpen;

          return (
            <motion.div
              key={module.id}
              whileHover={isUnlocked ? { y: -5 } : {}}
              className={`relative card h-full flex flex-col ${!isUnlocked ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${isUnlocked ? 'bg-electric/10 text-electric' : 'bg-white/5 text-white/20'}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                      module.difficulty === 'Critical' ? 'border-red-500/50 text-red-500' : 
                      module.difficulty === 'Advanced' ? 'border-gold/50 text-gold' : 'border-white/20 text-white/50'
                    }`}>
                      {module.difficulty}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500 mt-2" />}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 leading-tight">{module.title}</h3>
                <div className="flex items-center gap-3 text-[11px] text-white/30 mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {module.lessonCount} Lessons</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.time}</span>
                </div>

                {/* Progress Bar Mini */}
                {isUnlocked && (
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/40">Completion</span>
                      <span className="font-bold text-electric">{moduleProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-electric transition-all duration-500" 
                        style={{ width: `${moduleProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {isUnlocked ? (
                <Link 
                  to={`/module/${module.id}`}
                  className="w-full py-4 border-t border-white/10 text-center text-sm font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
                >
                  Enter Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-electric" />
                </Link>
              ) : (
                <div className="w-full py-4 border-t border-white/10 text-center text-sm font-bold text-white/20 flex items-center justify-center gap-2 cursor-not-allowed">
                  Locked <Lock className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
