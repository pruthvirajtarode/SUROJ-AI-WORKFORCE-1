import React, { useState } from 'react';
import { Download, Play, Database, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Deterministic generators
const generateTenderData = (rows: number) => {
  return Array.from({ length: rows }).map((_, i) => ({
    clause: `${Math.floor(i / 5) + 1}.${(i % 5) + 1}${i % 3 === 0 ? '.2' : ''}`,
    description: [
      "The contractor shall provide a mobilisation advance bank guarantee.",
      "Defect liability period is 24 months from substantial completion.",
      "Delay damages will be levied at 0.5% per week of delay.",
      "All shop drawings must be submitted 14 days prior to execution.",
      "The site must be cleared of all debris before handover."
    ][i % 5],
    type: ["Financial", "Obligation", "Penalty", "Submission", "Milestone"][i % 5],
    impact: ["High", "Medium", "High", "Low", "Medium"][i % 5]
  }));
};

const generateEPCData = (rows: number) => {
  return Array.from({ length: rows }).map((_, i) => ({
    itemCode: `BOQ-${1000 + i}`,
    description: [
      "Excavation in hard rock including disposal",
      "M30 Grade Concrete for foundation",
      "TMT reinforcement steel Fe500D",
      "Structural steel fabrication and erection",
      "Epoxy flooring 3mm thick"
    ][i % 5],
    unit: ["Cum", "Cum", "MT", "MT", "Sqm"][i % 5],
    quantity: (Math.random() * 1000).toFixed(2),
    rate: (Math.random() * 5000 + 500).toFixed(2)
  }));
};

const generateBankRecData = (rows: number) => {
  return Array.from({ length: rows }).map((_, i) => ({
    date: `2024-03-${String((i % 30) + 1).padStart(2, '0')}`,
    reference: `TXN${100000 + i}`,
    description: [
      "NEFT-Vendor Payment",
      "RTGS-Client Advance",
      "Bank Charges",
      "Salary Disbursal",
      "Cheque Cleared"
    ][i % 5],
    debit: i % 2 === 0 ? (Math.random() * 50000).toFixed(2) : "-",
    credit: i % 2 !== 0 ? (Math.random() * 100000).toFixed(2) : "-",
    status: ["Matched", "Unmatched", "Matched", "Pending", "Matched"][i % 5]
  }));
};

const SyntheticDataLab = () => {
  const [session, setSession] = useState("1");
  const [datasetType, setDatasetType] = useState("Tender obligations");
  const [rows, setRows] = useState("10");
  const [data, setData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    
    setTimeout(() => {
      let newData: any[] = [];
      const numRows = parseInt(rows);
      if (datasetType === "Tender obligations") newData = generateTenderData(numRows);
      if (datasetType === "EPC BOQ") newData = generateEPCData(numRows);
      if (datasetType === "Bank reconciliation") newData = generateBankRecData(numRows);
      
      setData(newData);
      setIsGenerating(false);
      setGenerated(true);
    }, 800); // Fake generation delay for effect
  };

  const handleDownload = () => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(",");
    const csvData = data.map(row => Object.values(row).map(val => `"${val}"`).join(",")).join("\n");
    const blob = new Blob([`${headers}\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic_${datasetType.replace(/\s+/g, '_').toLowerCase()}_${rows}rows.csv`;
    a.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12 max-w-5xl mx-auto"
    >
      <div className="border-b border-rule-2 pb-6">
        <div className="flex items-center text-ink-3 mb-2">
          <Database size={16} className="mr-2" />
          <span className="font-mono text-xs tracking-widest uppercase">Lab</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold">Synthetic Data Lab</h1>
        <p className="text-lg text-ink-2 mt-4 font-serif italic max-w-3xl">
          Generate deterministic, training-safe data sets for workshop exercises without exposing confidential company information.
        </p>
      </div>

      <motion.div 
        className="bg-paper-2 border border-rule-2 p-6 md:p-8 rounded-lg shadow-sm relative overflow-hidden"
        whileHover={{ boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-rust opacity-5 rounded-bl-full pointer-events-none"></div>
        
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          Configure Generator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink-2">Session Target</label>
            <select 
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full p-3 border border-rule rounded-md bg-paper focus:ring-2 focus:ring-ink focus:border-ink outline-none transition-all cursor-pointer font-sans"
            >
              <option value="1">1 - Tendering & Contracts</option>
              <option value="2">2 - EPC Bids</option>
              <option value="3">3 - Accounts & Finance</option>
              <option value="4">4 - Cost & Planning</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink-2">Dataset Schema</label>
            <select 
              value={datasetType}
              onChange={(e) => setDatasetType(e.target.value)}
              className="w-full p-3 border border-rule rounded-md bg-paper focus:ring-2 focus:ring-ink focus:border-ink outline-none transition-all cursor-pointer font-sans"
            >
              <option>Tender obligations</option>
              <option>EPC BOQ</option>
              <option>Bank reconciliation</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink-2">Row Count</label>
            <select 
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-full p-3 border border-rule rounded-md bg-paper focus:ring-2 focus:ring-ink focus:border-ink outline-none transition-all cursor-pointer font-sans"
            >
              <option value="10">10 rows (Demo)</option>
              <option value="25">25 rows</option>
              <option value="50">50 rows (Standard)</option>
              <option value="100">100 rows</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-4 border-t border-rule-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`flex items-center justify-center px-6 py-3 font-semibold rounded-md transition-all shadow-sm ${
              isGenerating ? 'bg-rust/80 text-paper cursor-not-allowed' : 'bg-rust text-paper hover:bg-brick'
            }`}
          >
            {isGenerating ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Play size={18} className="mr-2 fill-current" />}
            {isGenerating ? 'Generating...' : 'Generate Synthetic Data'}
          </motion.button>
          
          <AnimatePresence>
            {data.length > 0 && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex items-center justify-center px-6 py-3 bg-paper border border-rule text-ink font-semibold rounded-md hover:bg-paper-3 transition-colors shadow-sm"
              >
                <Download size={18} className="mr-2" />
                Download CSV
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {generated && data.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#FDFBF5] border border-rule rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-rule bg-paper">
              <span className="font-mono text-xs font-bold text-danger px-3 py-1 bg-[#F5E4D8] rounded border border-danger/20 flex items-center shadow-sm">
                <Database size={12} className="mr-2" />
                SYNTHETIC DATA - FOR TRAINING ONLY
              </span>
              <span className="font-mono text-xs text-ink-3">Showing {data.length} rows</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="border-b border-rule bg-paper-3 p-3 font-mono text-xs uppercase tracking-wider text-ink-2 whitespace-nowrap">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.02 } }
                  }}
                >
                  {data.map((row, i) => (
                    <motion.tr 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="hover:bg-paper-2 transition-colors border-b border-rule/50 last:border-0"
                    >
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="p-3 text-ink-2 max-w-[300px] truncate" title={val}>
                          {val}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SyntheticDataLab;
