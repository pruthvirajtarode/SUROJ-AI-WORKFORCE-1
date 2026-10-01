import React, { useState, useEffect } from 'react';
import { Play, Square, CheckCircle, Clock, ArrowRight, Pause, FastForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const defaultAgenda = [
  { id: 1, time: '0:00 – 0:30', name: 'Foundations Block', status: 'done' },
  { id: 2, time: '0:30 – 1:00', name: 'The Real Problem', status: 'current' },
  { id: 3, time: '1:00 – 1:15', name: 'Break', status: 'pending' },
  { id: 4, time: '1:15 – 2:40', name: 'Hands-on Exercises', status: 'pending' },
  { id: 5, time: '2:40 – 3:00', name: 'Live Q&A', status: 'pending' }
];

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState(defaultAgenda);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // In seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionNum, setSessionNum] = useState(1);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartExercise = () => {
    setTimeLeft(30 * 60); // 30 mins
    setTimerRunning(true);
    // Auto-advance agenda to Exercises
    const updated = agenda.map(item => {
      if (item.name === 'Hands-on Exercises') return { ...item, status: 'current' };
      if (item.status === 'current') return { ...item, status: 'done' };
      return item;
    });
    setAgenda(updated);
  };

  const setAgendaStatus = (id: number, status: string) => {
    const updated = agenda.map(item => {
      if (item.status === 'current' && status === 'current') return { ...item, status: 'done' };
      if (item.id === id) return { ...item, status };
      return item;
    });
    setAgenda(updated);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12 max-w-5xl"
    >
      <div className="border-b border-rule-2 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Trainer Dashboard</h1>
          <p className="text-lg text-ink-2 font-serif italic">
            Session control, timing, and engagement tracking.
          </p>
        </div>
        <div className="bg-ink text-paper px-5 py-3 rounded-lg flex items-center shadow-lg border border-ink-2">
          {timeLeft !== null ? (
            <>
              <div className="mr-3 text-rust flex items-center">
                {timerRunning ? <div className="w-2 h-2 bg-rust rounded-full animate-pulse mr-2"></div> : null}
                Exercise Timer
              </div>
              <span className={`font-mono text-2xl font-bold tracking-wider ${timeLeft < 300 ? 'text-danger' : 'text-paper'}`}>
                {formatTime(timeLeft)}
              </span>
              <button 
                onClick={() => setTimerRunning(!timerRunning)} 
                className="ml-4 p-1 bg-paper/10 hover:bg-paper/20 rounded transition-colors"
              >
                {timerRunning ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </>
          ) : (
            <>
              <Clock size={18} className="mr-2 text-rust" />
              <span className="font-mono text-lg font-bold tracking-wider">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-paper border border-rule-2 rounded-xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rust"></div>
            <div className="flex justify-between mb-2">
              <span className="font-mono text-xs text-ink-3 uppercase">Currently Running</span>
              <span className="font-mono text-xs font-bold text-rust">SESSION 0{sessionNum}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {sessionNum === 1 ? 'Tendering & Contracts' : 'EPC Bids & Design-Build'}
            </h2>
            <div className="flex items-center text-sm font-semibold text-ink-2 mb-6">
              <div className="w-2 h-2 bg-ok rounded-full animate-pulse mr-2"></div>
              {sessionNum === 1 ? '23' : '19'} Participants in room
            </div>
            
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-ink-3 tracking-widest uppercase">Session Agenda</h4>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {agenda.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer group ${
                        item.status === 'done' ? 'bg-paper-2 border-transparent text-ink-3' :
                        item.status === 'current' ? 'bg-[#FDFBF5] border-rust border-l-4 shadow-md' :
                        'bg-paper border-rule-2 text-ink-2 hover:border-ink/50'
                      }`}
                      onClick={() => setAgendaStatus(item.id, item.status === 'done' ? 'pending' : 'done')}
                    >
                      <div className="w-24 font-mono text-xs">{item.time}</div>
                      <div className={`flex-1 font-semibold transition-colors ${item.status === 'current' ? 'text-ink' : ''}`}>{item.name}</div>
                      <div className="flex items-center gap-2">
                        {item.status === 'pending' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setAgendaStatus(item.id, 'current'); }}
                            className="hidden group-hover:flex items-center px-2 py-1 text-xs bg-paper-2 border border-rule rounded mr-2 hover:bg-ink hover:text-paper transition-colors"
                          >
                            Set Active
                          </button>
                        )}
                        {item.status === 'done' && <CheckCircle size={18} className="text-ok" />}
                        {item.status === 'current' && <Play size={18} className="text-rust fill-rust" />}
                        {item.status === 'pending' && <Square size={18} className="text-rule-2 group-hover:text-ink-3 transition-colors" />}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="bg-[#FDFBF5] border border-rule-2 rounded-xl p-6 shadow-sm">
            <h4 className="font-mono text-xs text-ink-3 tracking-widest uppercase mb-4">Trainer Notes (Do NOT read aloud)</h4>
            <ul className="list-disc pl-5 space-y-2 text-ink-2 italic font-serif">
              <li>Do the tender demo live. It is the single most sticky proof.</li>
              <li>Walk the room during exercises. See their screens.</li>
              <li>Read one middle-tier output aloud and fix the prompt live.</li>
              <li>End with the "one workflow commitment" card.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-paper-2 border border-rule-2 rounded-xl p-6 shadow-sm">
            <h4 className="font-mono text-xs text-ink-3 tracking-widest uppercase mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartExercise}
                className="w-full text-left p-3.5 bg-paper border border-rule rounded-lg hover:bg-paper-3 transition-colors text-sm font-semibold flex justify-between items-center shadow-sm"
              >
                <span>Start Exercise Timer (30m)</span>
                <Play size={16} className="text-rust" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/data-safety')}
                className="w-full text-left p-3.5 bg-paper border border-rule rounded-lg hover:bg-paper-3 transition-colors text-sm font-semibold flex justify-between items-center shadow-sm"
              >
                <span>Show Data Safety Rules</span>
                <ArrowRight size={16} className="text-ink-2" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSessionNum(prev => prev === 1 ? 2 : 1);
                  setAgenda(defaultAgenda);
                }}
                className="w-full text-left p-3.5 bg-paper border border-rule rounded-lg hover:bg-paper-3 transition-colors text-sm font-semibold flex justify-between items-center shadow-sm"
              >
                <span>Open Next Session</span>
                <FastForward size={16} className="text-indigo" />
              </motion.button>
            </div>
          </div>

          <div className="bg-[#F5E4D8] border border-danger/30 rounded-xl p-6 shadow-sm">
            <h4 className="font-mono text-xs text-danger tracking-widest uppercase mb-2">Open Placement Questions</h4>
            <p className="text-sm text-ink-2 mb-4 italic">To be confirmed with Suroj HR before Day 1.</p>
            <ul className="text-sm space-y-2 font-semibold">
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 1. MEP placement
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 2. Operation placement
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 3. Mechanical placement
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 4. Quantity Surveyor placement
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 5. Precast placement
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 6. Quality/EHS headcount interpretation
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 7. Suroj Modular scope
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 8. Cost Control vs Planning team structure
              </li>
              <li className="flex items-start">
                <span className="text-danger mr-2">•</span> 9. Accounts 39-person room vs possible split
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainerDashboard;
