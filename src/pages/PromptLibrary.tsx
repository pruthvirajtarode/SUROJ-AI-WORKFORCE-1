import React, { useState } from 'react';
import { Copy, Check, Search, Filter, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

import { prompts } from '../data/prompts';

const PromptLibrary = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.department.toLowerCase().includes(search.toLowerCase()) ||
    p.useCase.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12 max-w-6xl mx-auto"
    >
      <div className="border-b border-rule-2 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center text-ink-3 mb-2 font-mono text-xs tracking-widest uppercase">
            <MessageSquare size={16} className="mr-2" /> Library
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Prompt Library</h1>
          <p className="text-lg text-ink-2 font-serif italic max-w-2xl">
            A curated, tested collection of high-leverage AI prompts for construction workflows.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input 
              type="text" 
              placeholder="Search prompts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-lg border border-rule bg-paper text-sm w-full md:w-64 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-shadow" 
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2.5 border border-rule rounded-lg bg-paper-2 hover:bg-paper-3 text-sm font-medium transition-colors"
          >
            <Filter size={16} className="mr-2" /> Filter
          </motion.button>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPrompts.map((p, i) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={p.id} 
            className="group flex flex-col bg-paper border border-rule-2 rounded-xl overflow-hidden hover:shadow-xl hover:border-ink/50 transition-all duration-300"
          >
            <div className="p-4 border-b border-rule bg-paper-2 flex justify-between items-center relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${p.color}`}></div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-mono tracking-widest text-ink-3 uppercase bg-paper px-2.5 py-1 border border-rule rounded-full shadow-sm">{p.department}</span>
                <span className="text-[10px] font-mono tracking-widest text-ink-3 uppercase flex items-center">
                  <Sparkles size={10} className="mr-1 text-ochre" /> {p.difficulty}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-1 group-hover:text-rust transition-colors">{p.title}</h3>
              <p className="text-sm text-ink-2 mb-4 font-medium">{p.useCase}</p>
              
              <div className="bg-[#1B1E22] p-4 rounded-lg text-sm font-mono text-[#E4DCC8] whitespace-pre-wrap flex-1 overflow-y-auto max-h-56 hide-scrollbar shadow-inner relative group-hover:bg-ink transition-colors">
                <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
                  <MessageSquare size={48} className="text-paper" />
                </div>
                <span className="text-ochre block mb-2 opacity-80">// Copy & paste this prompt</span>
                {p.prompt}
              </div>
            </div>
            <div className="p-4 border-t border-rule bg-paper-2 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(p.id, p.prompt)}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  copiedId === p.id 
                    ? 'bg-ok text-paper border border-ok ring-2 ring-ok/20' 
                    : 'bg-ink text-paper hover:bg-ink-2'
                }`}
              >
                {copiedId === p.id ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                {copiedId === p.id ? 'Copied to Clipboard' : 'Copy Prompt'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-20 text-ink-3">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg">No prompts found matching "{search}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default PromptLibrary;
