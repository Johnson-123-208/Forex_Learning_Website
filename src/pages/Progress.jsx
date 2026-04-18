import { useProgress } from '../hooks/useProgress';
import { Award, CheckCircle2, Star, Target, Zap, GraduationCap, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Progress = () => {
  const { progress, overallProgress } = useProgress();
  const overall = overallProgress();

  const achievements = [
    { id: 'basics', title: 'Trading Apprentice', desc: 'Complete Module 1', icon: <GraduationCap />, unlocked: progress.completedModules.includes(1) },
    { id: 'risk', title: 'Risk Manager', desc: 'Complete Risk Management Module', icon: <Target />, unlocked: progress.completedModules.includes(11) },
    { id: 'chart', title: 'Chart Master', desc: 'Complete Module 7', icon: <Star />, unlocked: progress.completedModules.includes(7) },
    { id: 'simulator', title: 'Demo Pro', desc: 'Make 10 trades in simulator', icon: <Zap />, unlocked: false }, // Placeholder for now
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Trading Journey</h1>
        <p className="text-white/60">Every lesson completed brings you one step closer to financial freedom.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2 card p-8 bg-gradient-to-br from-electric/10 to-transparent flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle 
                cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="12" 
                className="text-electric"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - overall / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{overall}%</span>
              <span className="text-xs uppercase tracking-widest text-white/40">Complete</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Overall Mastery</h2>
          <p className="text-white/40">You have completed {progress.completedLessons.length} lessons and {progress.completedModules.length} modules.</p>
        </div>

        <div className="card p-8 flex flex-col justify-center gap-6">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl"><Clock className="text-white/40" /></div>
              <div>
                 <p className="text-xs uppercase tracking-widest text-white/40">Time Spent</p>
                 <p className="text-xl font-bold">12h 45m</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl"><BookOpen className="text-white/40" /></div>
              <div>
                 <p className="text-xs uppercase tracking-widest text-white/40">Next Up</p>
                 <p className="text-xl font-bold">Price Action Essentials</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl"><Target className="text-white/40" /></div>
              <div>
                 <p className="text-xs uppercase tracking-widest text-white/40">Goal</p>
                 <p className="text-xl font-bold">Prop Firm Ready</p>
              </div>
           </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">Achievements & Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map(ach => (
          <div key={ach.id} className={`card p-8 flex flex-col items-center text-center transition-all ${ach.unlocked ? 'border-electric shadow-lg shadow-electric/10' : 'opacity-30 grayscale'}`}>
            <div className={`p-4 rounded-full mb-4 ${ach.unlocked ? 'bg-electric/20 text-electric' : 'bg-white/5 text-white/40'}`}>
              <div className="w-10 h-10 flex items-center justify-center">{ach.icon}</div>
            </div>
            <h3 className="font-bold mb-2">{ach.title}</h3>
            <p className="text-xs text-white/40">{ach.desc}</p>
            {ach.unlocked && (
              <div className="mt-4 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-full">
                Unlocked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
