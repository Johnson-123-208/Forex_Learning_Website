import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Module from './pages/Module';
import Lesson from './pages/Lesson';
import PaperTrading from './pages/PaperTrading';
import Calculators from './pages/Calculators';
import Journal from './pages/Journal';
import Progress from './pages/Progress';
import Glossary from './pages/Glossary';
import Resources from './pages/Resources';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-electric/30">
      <Navigation />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module/:moduleId" element={<Module />} />
          <Route path="/module/:moduleId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/paper-trading" element={<PaperTrading />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
