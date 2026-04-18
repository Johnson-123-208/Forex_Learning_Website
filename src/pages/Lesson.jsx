import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { modules } from '../data/modules-full';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Lock, HelpCircle, Menu, X, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lesson = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { progress, completeLesson } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [notes, setNotes] = useState(() => localStorage.getItem(`notes_${lessonId}`) || '');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Save notes on change
  useEffect(() => {
    localStorage.setItem(`notes_${lessonId}`, notes);
  }, [notes, lessonId]);

  const module = modules.find(m => m.id === parseInt(moduleId));
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) return <div className="p-20 text-center">Lesson not found</div>;

  const isCompleted = progress.completedLessons.includes(lessonId);
  const lessonIndex = module.lessons.indexOf(lesson);
  const nextLesson = module.lessons[lessonIndex + 1];
  const prevLesson = module.lessons[lessonIndex - 1];

  const handleComplete = () => {
    completeLesson(moduleId, lessonId);
    if (nextLesson) {
      navigate(`/module/${moduleId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/module/${moduleId}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-navy pt-16">
      {/* Sidebar */}
      <aside className={`fixed left-0 bottom-0 top-16 bg-navy-light/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 z-40 ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        <div className="p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-electric" /> {module.title}
          </h2>
          <div className="space-y-2">
            {module.lessons.map((l, idx) => {
              const isActive = l.id === lessonId;
              const isDone = progress.completedLessons.includes(l.id);
              const isLocked = !progress.forceUnlockAll && idx > 0 && !progress.completedLessons.includes(module.lessons[idx-1].id);

              return (
                <Link 
                  key={l.id}
                  to={isLocked ? '#' : `/module/${moduleId}/lesson/${l.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all relative group ${
                    isActive ? 'bg-electric/10 text-electric font-bold' : 
                    isLocked ? 'text-white/10 cursor-not-allowed' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && <motion.div layoutId="sidebar-active" className="absolute left-0 top-2 bottom-2 w-1 bg-electric rounded-full" />}
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isActive ? 'border-electric/50 bg-electric/20' : 
                    isDone ? 'border-green-500/50 bg-green-500/20' : 'border-white/10'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : 
                     isLocked ? <Lock className="w-3.5 h-3.5" /> : <span className="text-[8px]">{idx + 1}</span>}
                  </div>
                  <span className="truncate">{l.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <div className="fixed top-20 left-4 z-50">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-navy-light border border-white/10 rounded-lg shadow-xl hover:bg-white/5 transition-colors text-white/60"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <Link to={`/module/${moduleId}`} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase font-bold tracking-widest">
              <ChevronLeft className="w-4 h-4" /> Back to Module
            </Link>
            <div className="text-[10px] font-bold text-electric uppercase tracking-widest">Lesson {lessonIndex + 1} of {module.lessonCount}</div>
          </div>

          <div className="relative h-48 md:h-64 mb-8 rounded-2xl overflow-hidden group border border-white/5">
            <img src={lesson.image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={lesson.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
            <h1 className="absolute bottom-6 left-6 right-6 text-xl md:text-3xl font-bold">{lesson.title}</h1>
          </div>

          <article className="prose prose-invert prose-lg max-w-none mb-20">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </article>

          {/* Ask AI Section */}
          <section className="mt-20 card p-8 border-electric/20 bg-electric/5">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-electric">
              <Zap className="w-5 h-5" /> Ask AI Assistant
            </h3>
            <p className="text-sm text-white/60 mb-6">Unsure about a concept? Ask our Forex AI expert for a detailed explanation.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type your question here (e.g. 'Explain risk management with numbers')..."
                className="w-full bg-navy border border-white/10 p-4 rounded-xl outline-none focus:border-electric pr-12"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-electric hover:scale-110 transition-transform">
                 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {aiResponse && (
               <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/5 leading-relaxed text-white/80">
                 {aiResponse}
               </div>
            )}
          </section>

          {/* Notes Section */}
          <section className="mt-20 mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold">
               <BookOpen className="w-5 h-5" /> Lesson Notes
            </h3>
            <textarea 
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-gold/50 transition-all text-white/80"
              placeholder="Jot down your takeaways or questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="text-[10px] text-white/20 mt-2 uppercase tracking-widest leading-relaxed">Your notes are automatically saved to your browser's local storage.</p>
          </section>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-20 pt-12 border-t border-white/10">
            {prevLesson ? (
               <Link to={`/module/${moduleId}/lesson/${prevLesson.id}`} className="flex flex-col items-start group">
                 <span className="text-xs text-white/40 uppercase font-bold mb-1">Previous</span>
                 <span className="font-bold flex items-center gap-1 group-hover:text-electric transition-colors"><ChevronLeft className="w-4 h-4" /> {prevLesson.title}</span>
               </Link>
            ) : <div />}
            
            <button onClick={handleComplete} className="btn-primary px-8">
              {nextLesson ? 'Complete & Next' : 'Finish Module'}
            </button>

            {nextLesson ? (
               <Link to={`/module/${moduleId}/lesson/${nextLesson.id}`} className="flex flex-col items-end group">
                 <span className="text-xs text-white/40 uppercase font-bold mb-1 text-right">Next</span>
                 <span className="font-bold flex items-center gap-1 group-hover:text-electric transition-colors">{nextLesson.title} <ChevronRight className="w-4 h-4" /></span>
               </Link>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lesson;
