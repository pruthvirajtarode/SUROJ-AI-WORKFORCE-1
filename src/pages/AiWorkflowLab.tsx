import React, { useState } from 'react';
import { ArrowDown, FileText, Bot, UserCheck, RefreshCw } from 'lucide-react';

const AiWorkflowLab = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: FileText,
      title: "1. Input Document",
      desc: "Raw, unstructured data (e.g. 300-page tender PDF).",
      color: "border-rule bg-paper",
      detail: "The process begins with an actual document. Do not ask AI to generate facts from its memory. Provide the ground truth."
    },
    {
      id: 1,
      icon: Bot,
      title: "2. AI Analysis",
      desc: "Apply structured prompt pattern.",
      color: "border-rust text-rust bg-rust/5",
      detail: "Using a tested 5-part prompt (Role, Context, Task, Format, Constraint), the AI reads the document and extracts the required data."
    },
    {
      id: 2,
      icon: UserCheck,
      title: "3. Human Verification",
      desc: "Check output against source.",
      color: "border-ok text-ok bg-ok/5",
      detail: "The output is treated as a draft. The human uses the 'cite it back' rule to verify the extracted information against the original document."
    },
    {
      id: 3,
      icon: RefreshCw,
      title: "4. Repeatable Habit",
      desc: "Save prompt and build into process.",
      color: "border-indigo text-indigo bg-indigo/5",
      detail: "The successful prompt is saved to the shared library and becomes the standard first step for this workflow moving forward."
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="text-center pb-8 border-b border-rule-2">
        <div className="font-mono text-xs text-rust mb-2 tracking-widest uppercase">Interactive Builder</div>
        <h1 className="text-3xl font-semibold mb-4">The Universal AI Workflow</h1>
        <p className="text-lg text-ink-2 font-serif italic max-w-2xl mx-auto">
          "Documents in → AI Drafts → Human Decides → Repeatable Habit"
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mt-12">
        {/* Visual Pipeline */}
        <div className="flex flex-col items-center flex-1">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div 
                className={`w-full max-w-sm border-2 rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                  activeStep === step.id ? `ring-2 ring-offset-4 ring-offset-paper ${step.color.split(' ')[0].replace('border-', 'ring-')}` : 'opacity-70 hover:opacity-100'
                } ${step.color}`}
                onClick={() => setActiveStep(step.id)}
              >
                <step.icon size={24} className="mr-4 shrink-0" />
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="text-sm font-mono opacity-80 mt-1">{step.desc}</p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="py-3 text-rule-2">
                  <ArrowDown size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Detail Panel */}
        <div className="flex-1">
          <div className="bg-paper-2 border border-rule-2 rounded-lg p-8 sticky top-24 shadow-md">
            <div className="font-mono text-xs text-ink-3 uppercase tracking-widest mb-4">Step {activeStep + 1} Detail</div>
            <h2 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h2>
            <p className="text-lg text-ink-2 mb-6 leading-relaxed">
              {steps[activeStep].detail}
            </p>
            
            {activeStep === 1 && (
              <div className="bg-[#1B1E22] text-[#E4DCC8] p-4 rounded font-mono text-sm">
                <span className="text-ochre block mb-2">// The Cite-It-Back Rule</span>
                "For every claim, quote the exact sentence and give its clause / section / page reference."
              </div>
            )}
            
            {activeStep === 2 && (
              <div className="bg-[#F5E4D8] border-l-4 border-danger p-4 rounded text-ink">
                <strong>Crucial:</strong> If the AI cannot point to a source in the document, the answer is a hallucination. Discard it.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiWorkflowLab;
