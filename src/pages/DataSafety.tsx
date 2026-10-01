import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

const DataSafety = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  
  const scenarios = [
    { id: 1, text: "A competitor's pricing sheet leaked to your email.", type: "danger", explanation: "Never upload. Confidential pricing or competitor data." },
    { id: 2, text: "A draft company policy for IT hardware.", type: "anonymise", explanation: "Safe if you swap out specific names, employee IDs, and company names." },
    { id: 3, text: "A public PWD tender downloaded from their portal.", type: "safe", explanation: "Safe. It is already a public document." },
    { id: 4, text: "An employee's medical leave application.", type: "danger", explanation: "Never upload. Contains sensitive Personal Identifiable Information (PII)." }
  ];

  const handleAnswer = (id: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: answer }));
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="text-center pb-8 border-b border-rule-2">
        <ShieldAlert size={48} className="mx-auto mb-4 text-danger" />
        <h1 className="text-3xl font-semibold mb-4">Data Safety Guardrails</h1>
        <p className="text-lg text-ink-2 font-serif italic max-w-2xl mx-auto">
          "Read this once, remember it forever. There is no long version."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#F5E4D8] border border-danger/30 p-6 rounded-md shadow-sm">
          <div className="flex items-center mb-4">
            <ShieldX size={24} className="text-danger mr-3" />
            <h3 className="text-xl font-bold text-danger">Never Upload</h3>
          </div>
          <ul className="space-y-3 font-medium">
            <li>• Aadhaar, PAN, bank details, salary figures.</li>
            <li>• A live tender bid price before submission.</li>
            <li>• Signed contracts in their entirety (unless redacted).</li>
            <li>• Legal correspondence/notices.</li>
            <li>• Anything marked "confidential".</li>
          </ul>
        </div>
        
        <div className="bg-[#E6EBDA] border border-ok/30 p-6 rounded-md shadow-sm">
          <div className="flex items-center mb-4">
            <ShieldCheck size={24} className="text-ok mr-3" />
            <h3 className="text-xl font-bold text-ok">Fine to Upload</h3>
          </div>
          <ul className="space-y-3 font-medium">
            <li>• Public tender documents from portals.</li>
            <li>• Draft internal documents (with placeholders).</li>
            <li>• Blank templates and forms.</li>
            <li>• Standard specifications (IS codes).</li>
          </ul>
        </div>
      </div>

      <div className="bg-paper-2 border border-rule-2 p-8 rounded-md mt-12">
        <h3 className="text-2xl font-semibold mb-2">Interactive Quiz: Can I Upload This?</h3>
        <p className="text-ink-2 mb-8">Test your intuition before using AI tools.</p>
        
        <div className="space-y-8">
          {scenarios.map(s => (
            <div key={s.id} className="border-b border-rule pb-6 last:border-0">
              <p className="font-semibold text-lg mb-4">{s.text}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <button 
                  onClick={() => handleAnswer(s.id, 'safe')}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase ${selectedAnswers[s.id] === 'safe' ? 'bg-ok text-paper border-ok' : 'bg-paper border-rule hover:bg-paper-3'}`}
                >Safe</button>
                <button 
                  onClick={() => handleAnswer(s.id, 'anonymise')}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase ${selectedAnswers[s.id] === 'anonymise' ? 'bg-ochre text-paper border-ochre' : 'bg-paper border-rule hover:bg-paper-3'}`}
                >Anonymise</button>
                <button 
                  onClick={() => handleAnswer(s.id, 'danger')}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase ${selectedAnswers[s.id] === 'danger' ? 'bg-danger text-paper border-danger' : 'bg-paper border-rule hover:bg-paper-3'}`}
                >Do Not Upload</button>
              </div>
              
              {selectedAnswers[s.id] && (
                <div className={`p-4 rounded text-sm font-medium ${
                  selectedAnswers[s.id] === s.type ? 'bg-[#E6EBDA] text-ok border border-ok/20' : 'bg-[#F5E4D8] text-danger border border-danger/20'
                }`}>
                  {selectedAnswers[s.id] === s.type ? 'Correct.' : 'Incorrect.'} {s.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSafety;
