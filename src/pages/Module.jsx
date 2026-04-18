import { useParams, Link, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules-full';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft, PlayCircle, CheckCircle2, Clock, BarChart3, ArrowRight, BookOpen, TrendingUp, Globe, Monitor, CandlestickChart, LayoutGrid, Ruler, Shield, LineChart, Newspaper, Percent, Brain, Swords, Layers, Zap, Briefcase, ChevronRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  BookOpen, TrendingUp, Globe, Monitor, CandlestickChart, LayoutGrid, Ruler, Shield, LineChart, Newspaper, Percent, Brain, Swords, Layers, Zap, Briefcase, Building2
};

const Module = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { progress, getModuleProgress } = useProgress();
  
  const module = modules.find(m => m.id === parseInt(moduleId));
  if (!module) return <div className="p-20 text-center">Module not found</div>;

  const moduleProgress = getModuleProgress(module.id, module.lessonCount);
  const Icon = iconMap[module.icon] || BookOpen;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group text-[10px] font-bold uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="p-4 rounded-xl bg-electric/10 text-electric mb-6 inline-block">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-3">{module.title}</h1>
            <div className="flex flex-col gap-3 text-white/40 mb-8 border-b border-white/5 pb-8 text-xs uppercase font-bold tracking-widest">
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {module.time || '1.5h'} duration</span>
              <span className="flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5" /> {module.difficulty || 'Beginner'}</span>
              <span className="flex items-center gap-2"><PlayCircle className="w-3.5 h-3.5" /> {module.lessonCount} lessons</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest mb-2">
                <span className="text-white/30">Module Progress</span>
                <span className="text-electric">{moduleProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-electric transition-all duration-500" 
                  style={{ width: `${moduleProgress}%` }}
                ></div>
              </div>
            </div>

            <Link 
              to={`/module/${module.id}/lesson/${module.lessons[0].id}`}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              Resume Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Lessons List */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold mb-6 uppercase tracking-widest text-white/40">Curriculum</h2>
          <div className="space-y-3">
            {module.lessons.map((lesson, idx) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isLocked = !progress.forceUnlockAll && idx > 0 && !progress.completedLessons.includes(module.lessons[idx - 1].id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={isLocked ? '#' : `/module/${module.id}/lesson/${lesson.id}`}
                    className={`flex items-center justify-between p-4 card hover:border-electric/30 transition-all ${
                      isCompleted ? 'border-green-500/20 bg-green-500/5' : ''
                    } ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[10px] font-bold ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-white/10 text-white/30'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold ${isCompleted ? 'text-white/80' : 'text-white'}`}>{lesson.title}</h3>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mt-0.5">{lesson.time || '15 mins'}</p>
                      </div>
                    </div>
                    {isLocked ? <Shield className="w-4 h-4 text-white/10" /> : <ChevronRight className="w-4 h-4 text-white/10" />}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;
