import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

import { caseStudies } from '../data/caseStudies';

const CaseStudies = () => {
  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVars: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'rust': return 'bg-rust text-rust border-rust bg-rust/10';
      case 'indigo': return 'bg-indigo text-indigo border-indigo bg-indigo/10';
      case 'ochre': return 'bg-ochre text-ochre border-ochre bg-ochre/10';
      default: return 'bg-ink text-ink border-ink bg-ink/10';
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVars}
      className="space-y-8 pb-12 max-w-7xl mx-auto"
    >
      <div className="border-b border-rule-2 pb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center text-ink-3 mb-2 font-mono text-xs tracking-widest uppercase">
            <BookOpen size={16} className="mr-2" /> Library
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Case Study Library</h1>
          <p className="text-lg text-ink-2 font-serif italic max-w-2xl">
            Real and illustrative scenarios demonstrating AI workflow integration.
          </p>
        </div>
      </div>

      <motion.div variants={containerVars} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {caseStudies.map((cs) => {
          const colorClasses = getColorClasses(cs.color);
          const colorBase = colorClasses.split(' ')[0].replace('bg-', '');
          
          return (
            <motion.div 
              key={cs.id} 
              variants={itemVars}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="flex flex-col bg-paper border border-rule-2 rounded-xl overflow-hidden hover:shadow-xl hover:border-ink/30 transition-all duration-300 relative"
            >
              <div className={`h-2 w-full bg-${colorBase}`}></div>
              <div className="p-6 flex-1 flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 border rounded-full shadow-sm ${colorClasses.split(' ')[1]} ${colorClasses.split(' ')[2]} ${colorClasses.split(' ')[3]}`}>
                    {cs.badge}
                  </span>
                  <span className="text-[10px] font-mono text-ink-3 uppercase tracking-widest bg-paper-2 px-2 py-1 rounded">{cs.session}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 leading-tight">{cs.title}</h3>
                
                <div className="bg-paper-2 p-4 rounded-lg border-l-4 border-rule mb-6 italic text-sm text-ink-2 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-rule-2/30 font-serif text-6xl leading-none">"</div>
                  <span className="relative z-10">{cs.context}</span>
                </div>
                
                <div className="space-y-5 flex-1">
                  <div className="relative pl-6">
                    <AlertTriangle size={16} className={`absolute left-0 top-0.5 text-${colorBase}`} />
                    <div className="text-xs font-mono font-bold text-ink-3 uppercase mb-1">The Problem</div>
                    <p className="text-sm leading-relaxed">{cs.problem}</p>
                  </div>
                  
                  <div className="relative pl-6">
                    <Lightbulb size={16} className={`absolute left-0 top-0.5 text-${colorBase}`} />
                    <div className="text-xs font-mono font-bold text-ink-3 uppercase mb-1">{cs.aiWorkflow ? "AI Approach" : "Solution"}</div>
                    <p className="text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                  
                  <div className="relative pl-6 bg-[#E6EBDA] p-3 rounded-lg border border-ok/20 -ml-2 mb-2">
                    <TrendingUp size={16} className="absolute left-2 top-3.5 text-ok" />
                    <div className="text-xs font-mono font-bold text-ok uppercase mb-1">Impact / Outcome</div>
                    <p className="text-sm font-semibold text-ink">{cs.result}</p>
                  </div>

                  <div className="text-[10px] text-ink-3 italic border-t border-rule mt-4 pt-2">
                    Source: {cs.source}
                  </div>
                </div>
              </div>
              
              <Link to="/workflow-lab" className="bg-paper-2 border-t border-rule-2 p-5 flex justify-between items-center group cursor-pointer hover:bg-paper-3 transition-colors block">
                <div className="flex items-center text-sm font-bold text-ink-2 group-hover:text-ink transition-colors">
                  <BookOpen size={16} className="mr-2" />
                  View Full Workflow
                </div>
                <motion.div 
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={18} className="text-ink-2 group-hover:text-ink" />
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  );
};

export default CaseStudies;
