import React from 'react';

const Schedule = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div className="border-b border-rule-2 pb-6">
        <h1 className="text-3xl font-semibold mb-4">Workshop Schedule</h1>
        <p className="text-lg text-ink-2 font-serif italic">
          Suggested three-day structural flow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Day 1 */}
        <div className="bg-paper-2 border border-rule-2 rounded-md overflow-hidden shadow-sm">
          <div className="bg-ink text-paper p-4 font-mono font-bold tracking-widest text-center flex flex-col">
            <span>DAY 1</span>
            <span className="text-xs text-rule font-normal mt-1">8th Oct '26</span>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Morning (10am - 1pm)</div>
              <div className="p-3 bg-paper border-l-4 border-rust shadow-sm mb-3">
                <span className="font-bold block text-sm mb-1">S1: Tendering & Contracts</span>
                <span className="text-xs text-ink-2 font-mono">42 Participants</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Afternoon (3pm - 6pm)</div>
              <div className="p-3 bg-paper border-l-4 border-indigo shadow-sm">
                <span className="font-bold block text-sm mb-1">S2: Accounts & Finance</span>
                <span className="text-xs text-ink-2 font-mono">39 Participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Day 2 */}
        <div className="bg-paper-2 border border-rule-2 rounded-md overflow-hidden shadow-sm">
          <div className="bg-ink text-paper p-4 font-mono font-bold tracking-widest text-center flex flex-col">
            <span>DAY 2</span>
            <span className="text-xs text-rule font-normal mt-1">9th Oct '26</span>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Morning (10am - 1pm)</div>
              <div className="p-3 bg-paper border-l-4 border-ochre shadow-sm">
                <span className="font-bold block text-sm mb-1">S3: People, Admin & Comm</span>
                <span className="text-xs text-ink-2 font-mono">29 Participants</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Afternoon (3pm - 6pm)</div>
              <div className="p-3 bg-paper border-l-4 border-moss shadow-sm">
                <span className="font-bold block text-sm mb-1">S4: Cost, Planning & Systems</span>
                <span className="text-xs text-ink-2 font-mono">26 Participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Day 3 */}
        <div className="bg-paper-2 border border-rule-2 rounded-md overflow-hidden shadow-sm">
          <div className="bg-ink text-paper p-4 font-mono font-bold tracking-widest text-center flex flex-col">
            <span>DAY 3</span>
            <span className="text-xs text-rule font-normal mt-1">10th Oct '26</span>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Morning (10am - 1pm)</div>
              <div className="p-3 bg-paper border-l-4 border-steel shadow-sm mb-3">
                <span className="font-bold block text-sm mb-1">S5: Procurement & Stores</span>
                <span className="text-xs text-ink-2 font-mono">23 Participants</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">Afternoon (3pm - 6pm)</div>
              <div className="p-3 bg-paper border-l-4 border-brick shadow-sm">
                <span className="font-bold block text-sm mb-1">S6: Design, Drawings & Quantities</span>
                <span className="text-xs text-ink-2 font-mono">18 Participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
