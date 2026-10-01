import React, { useState } from 'react';
import { Users, BookOpen, Layers, CalendarDays, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { sessions, globalStats } from '../data/sessions';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const Dashboard = () => {
  const [showQR, setShowQR] = useState(false);

  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVars: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const familyData = [
    { name: "Tendering & Contracts", count: 42, color: "var(--color-rust)" },
    { name: "Accounts & Finance", count: 39, color: "var(--color-indigo)" },
    { name: "People, Admin & Comm", count: 29, color: "var(--color-ochre)" },
    { name: "Cost, Planning & Systems", count: 26, color: "var(--color-moss)" },
    { name: "Procurement & Stores", count: 23, color: "var(--color-steel)" },
    { name: "Design & Quantities", count: 18, color: "var(--color-brick)" },
  ];

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={containerVars}
      className="space-y-10"
    >
      {/* Zoomed QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-6"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-paper p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full relative"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 bg-paper-2 hover:bg-paper-3 rounded-full transition-colors"
              >
                <X size={20} className="text-ink-2" />
              </button>
              
              <h3 className="text-2xl font-semibold mb-2">Scan to View Mobile</h3>
              <p className="text-ink-3 text-sm text-center mb-8">Point your phone's camera at this QR code to view the live dashboard on your device.</p>
              
              <div className="bg-white p-6 rounded-xl shadow-inner border border-rule">
                <QRCodeSVG 
                  value="https://suroj-ai-workforce-1.vercel.app/"
                  size={240}
                  bgColor={"#ffffff"}
                  fgColor={"#14161A"}
                  level={"Q"}
                />
              </div>
              <p className="font-mono text-xs text-ink-3 mt-6 uppercase tracking-widest">suroj-ai-workforce-1.vercel.app</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Updated Header with Image Background and removed blueprint grid */}
      <motion.header 
        variants={itemVars} 
        className="relative overflow-hidden bg-ink text-paper p-10 md:p-16 rounded-xl shadow-2xl border border-ink-2"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(20, 22, 26, 0.9) 0%, rgba(20, 22, 26, 0.5) 50%, rgba(20, 22, 26, 0.1) 100%), url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-ochre mb-6 uppercase tracking-widest flex items-center gap-4"
          >
            <div className="w-2 h-2 bg-rust rounded-full animate-pulse"></div>
            {/* Suroj logo — own card */}
            <div className="bg-white rounded-xl p-2 md:p-3 flex items-center shadow-lg transform transition-transform hover:scale-105">
              <img src="/suroj-logo.svg" alt="Suroj Buildcon" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            {/* Be10x logo — own separate card */}
            <div className="bg-white rounded-xl p-2 md:p-3 flex items-center shadow-lg transform transition-transform hover:scale-105">
              <img src="/be10x-logo.png" alt="Be10x Logo" className="h-12 md:h-16 w-auto object-contain" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6 font-serif italic text-white drop-shadow-md">
            Six sessions.<br/>One transformation system.
          </h1>
          <p className="text-paper-3 text-lg max-w-xl text-opacity-90">
            From workshop learning to repeatable AI-enabled workflows. Building the intelligent foundation for enterprise construction.
          </p>
        </div>

        {/* QR Code for Mobile Scanning */}
        <div 
          onClick={() => setShowQR(true)}
          className="absolute top-6 right-6 hidden md:flex flex-col items-center bg-paper/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 hover:bg-paper/30 transition-colors shadow-lg z-20 cursor-zoom-in group"
        >
          <div className="bg-white/90 p-2 rounded-lg group-hover:bg-white transition-colors">
            <QRCodeSVG 
              value="https://suroj-ai-workforce-1.vercel.app/"
              size={64}
              bgColor={"transparent"}
              fgColor={"#14161A"} // text-ink color
              level={"L"}
            />
          </div>
          <span className="text-[10px] font-mono mt-2 text-paper uppercase tracking-widest text-center leading-tight">Scan for<br/>Mobile</span>
        </div>
      </motion.header>

      {/* KPI Cards */}
      <motion.section variants={containerVars} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Participants', value: globalStats.totalParticipants, icon: Users, color: 'text-rust', bg: 'bg-rust/10', border: 'border-rust/20' },
          { label: 'Sessions', value: globalStats.totalSessions, icon: BookOpen, color: 'text-indigo', bg: 'bg-indigo/10', border: 'border-indigo/20' },
          { label: 'Departments', value: 16, icon: Layers, color: 'text-steel', bg: 'bg-steel/10', border: 'border-steel/20' },
          { label: 'Workshop Days', value: globalStats.workshopDays, icon: CalendarDays, color: 'text-ochre', bg: 'bg-ochre/10', border: 'border-ochre/20' },
        ].map((kpi, i) => (
          <motion.div 
            key={i} 
            variants={itemVars}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className={`bg-paper-2 border p-6 rounded-xl shadow-sm relative overflow-hidden transition-all ${kpi.border}`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${kpi.bg} -mr-4 -mt-4 opacity-50`}></div>
            <kpi.icon className={`w-8 h-8 ${kpi.color} mb-4 relative z-10`} />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
              className="text-4xl font-semibold font-sans relative z-10"
            >
              {kpi.value}
            </motion.div>
            <div className="text-xs font-mono text-ink-3 uppercase mt-2 tracking-wider relative z-10">{kpi.label}</div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-paper border border-rule-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-ink rounded-full mr-3"></span>
            Participants by Session
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessions} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="title" type="category" width={160} tick={{fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--color-paper-2)', radius: 4}} 
                  contentStyle={{backgroundColor: '#14161A', color: '#F6F2E9', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="headcount" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
                  {sessions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.color === 'rust' ? 'var(--color-rust)' :
                      entry.color === 'brick' ? 'var(--color-brick)' :
                      entry.color === 'indigo' ? 'var(--color-indigo)' :
                      entry.color === 'steel' ? 'var(--color-steel)' :
                      entry.color === 'slate' ? 'var(--color-slate)' :
                      entry.color === 'ochre' ? 'var(--color-ochre)' :
                      entry.color === 'iron' ? 'var(--color-iron)' : 'var(--color-moss)'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Added Interactive Pie Chart */}
        <div className="bg-paper border border-rule-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-1.5 h-6 bg-ink rounded-full mr-3"></span>
            Distribution by Session Category
          </h3>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-between">
             <div className="h-[220px] w-full md:w-1/2">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={familyData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="count"
                     stroke="none"
                     animationDuration={1500}
                     animationBegin={400}
                   >
                     {familyData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{backgroundColor: '#14161A', color: '#F6F2E9', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                     itemStyle={{color: '#EFE9DB'}}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             
             <div className="w-full md:w-1/2 flex flex-col gap-4 mt-4 md:mt-0">
               {familyData.map(f => (
                 <div key={f.name} className="flex items-center group cursor-default">
                   <div className="w-3 h-3 rounded-full mr-3 shrink-0" style={{ backgroundColor: f.color }}></div>
                   <div className="flex-1">
                     <div className="text-xs font-semibold text-ink leading-tight">{f.name}</div>
                     <div className="text-[10px] font-mono text-ink-3 uppercase">{f.count} participants ({(f.count/184*100).toFixed(0)}%)</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
