import React from 'react';
import { motion } from 'framer-motion';

const ProgrammeOverview = () => {
  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const stepVars: any = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  const steps = [
    {
      title: "Session 1 — EPC Bids & Design-Build",
      sessions: "Morning, Day 1",
      desc: "Contract & Tendering | EPC",
      color: "border-rust text-rust shadow-rust/10",
      bg: "bg-rust/5",
      delay: 0.1
    },
    {
      title: "Session 2 — Accounts & Finance",
      sessions: "Afternoon, Day 1",
      desc: "Accounts",
      color: "border-indigo text-indigo shadow-indigo/10",
      bg: "bg-indigo/5",
      delay: 0.2
    },
    {
      title: "Session 3 — People, Admin & Communication",
      sessions: "Morning, Day 2",
      desc: "HR & Admin | EHS",
      color: "border-ochre text-ochre shadow-ochre/10",
      bg: "bg-ochre/5",
      delay: 0.3
    },
    {
      title: "Session 4 — Cost, Planning & Systems",
      sessions: "Afternoon, Day 2",
      desc: "Cost Control | Planning",
      color: "border-moss text-moss shadow-moss/10",
      bg: "bg-moss/5",
      delay: 0.4
    },
    {
      title: "Session 5 — Procurement & Stores",
      sessions: "Morning, Day 3",
      desc: "Purchase | Store | V&M",
      color: "border-steel text-steel shadow-steel/10",
      bg: "bg-steel/5",
      delay: 0.5
    },
    {
      title: "Session 6 — Design, Drawings & Quantities",
      sessions: "Afternoon, Day 3",
      desc: "MEP | Quantity Surveyor",
      color: "border-brick text-brick shadow-brick/10",
      bg: "bg-brick/5",
      delay: 0.6
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-4xl mx-auto pb-12"
    >
      <div className="border-b border-rule-2 pb-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs text-ink-3 mb-3 tracking-widest uppercase"
        >
          Overview
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-semibold"
        >
          The Programme Map
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-ink-2 mt-4 font-serif italic max-w-2xl mx-auto leading-relaxed"
        >
          Four learning families, transforming traditional workflows into AI-enabled operational habits.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rule-2 before:to-transparent mt-12 pt-8"
      >
        {steps.map((step, idx) => (
          <motion.div 
            key={idx} 
            variants={stepVars}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className={`flex items-center justify-center w-14 h-14 rounded-full border-[3px] bg-paper shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg ${step.color} z-10 relative`}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: step.delay + 0.2 }}
              >
                <span className="font-mono font-bold text-lg">{['A','B','C','D'][idx]}</span>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={`w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-6 rounded-xl border border-rule-2 bg-paper-2 shadow-sm relative overflow-hidden`}
            >
              <div className={`absolute inset-0 ${step.bg} opacity-50`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-xl">{step.title}</h3>
                  <span className="font-mono text-xs font-bold px-2 py-1 bg-paper border border-rule-2 rounded shadow-sm">{step.sessions}</span>
                </div>
                <p className="text-ink font-mono text-sm border-l-2 pl-3 border-ink-3/30 bg-paper-3/20 p-2 rounded-r">{step.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-20 bg-ink text-paper p-8 md:p-10 rounded-xl text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden border border-ink-2"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-rust opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-ok opacity-10 rounded-full blur-2xl"></div>
        
        <h4 className="font-mono text-sm text-ochre mb-8 tracking-widest uppercase font-bold relative z-10">The Universal AI Workflow</h4>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-semibold relative z-10">
          <motion.div whileHover={{ y: -5 }} className="px-5 py-3 border border-rule/30 rounded-lg shadow-sm bg-paper/5">
            INPUT
          </motion.div>
          
          <motion.span 
            animate={{ x: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-rule/50"
          >→</motion.span>
          
          <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-5 py-3 border border-rust rounded-lg text-rust bg-rust/10 shadow-[0_0_15px_rgba(176,67,30,0.2)]">
            AI ANALYSIS
          </motion.div>
          
          <motion.span 
            animate={{ x: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            className="text-rule/50"
          >→</motion.span>
          
          <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-5 py-3 border border-ok rounded-lg text-ok bg-ok/10 shadow-[0_0_15px_rgba(78,107,46,0.2)]">
            HUMAN DECIDES
          </motion.div>
          
          <motion.span 
            animate={{ x: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
            className="text-rule/50"
          >→</motion.span>
          
          <motion.div whileHover={{ y: -5 }} className="px-5 py-3 border border-rule/30 rounded-lg shadow-sm bg-paper/5">
            REPEATABLE HABIT
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgrammeOverview;
