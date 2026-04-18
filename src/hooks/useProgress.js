import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('forex_pro_progress');
    const defaultState = {
      completedModules: [],
      completedLessons: [],
      lastLessonId: null,
      totalTimeSpent: 0,
      forceUnlockAll: true
    };
    return saved ? { ...defaultState, ...JSON.parse(saved), forceUnlockAll: true } : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('forex_pro_progress', JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (moduleId, lessonId) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        lastLessonId: lessonId
      };
    });
  };

  const completeModule = (moduleId) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId]
      };
    });
  };

  const getModuleProgress = (moduleId, lessonCount) => {
    const completedInModule = progress.completedLessons.filter(id => id.startsWith(`${moduleId}.`)).length;
    return Math.round((completedInModule / lessonCount) * 100);
  };

  const overallProgress = () => {
    // This will be updated when more data is available
    return progress.completedLessons.length ? Math.min(Math.round((progress.completedLessons.length / 100) * 100), 100) : 0;
  };

  return { 
    progress, 
    completeLesson, 
    completeModule, 
    getModuleProgress,
    overallProgress 
  };
};
