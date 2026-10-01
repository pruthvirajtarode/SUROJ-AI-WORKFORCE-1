import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { week: 'Week 0', adoption: 10 },
  { week: 'Week 1', adoption: 35 },
  { week: 'Week 2', adoption: 45 },
  { week: 'Week 3', adoption: 60 },
  { week: 'Week 4', adoption: 75 }
];

const ProgressImpact = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-rule-2 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Progress & Impact</h1>
          <p className="text-lg text-ink-2 font-serif italic max-w-2xl">
            30-day workflow adoption tracking and metrics.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-danger px-2 py-1 bg-[#F5E4D8] border border-danger/20 rounded">
          DEMO METRICS ONLY
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sessions Completed', value: '8/8' },
          { label: 'Prompts Saved', value: '34' },
          { label: 'Workflows Embedded', value: '12' },
          { label: 'Exercises Completed', value: '24' }
        ].map((kpi, i) => (
          <div key={i} className="bg-paper border border-rule p-4 rounded-md shadow-sm">
            <div className="text-2xl font-bold font-sans">{kpi.value}</div>
            <div className="text-xs font-mono text-ink-3 uppercase mt-1 tracking-wider">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-paper border border-rule-2 rounded-md p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Workflow Adoption Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C9C0AA" vertical={false} />
                <XAxis dataKey="week" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#14161A', color: '#F6F2E9', border: 'none'}} />
                <Line type="monotone" dataKey="adoption" stroke="#B0431E" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-paper border border-rule-2 rounded-md p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">30-Day Check-In Status</h3>
          <div className="space-y-4">
            {[
              { dept: "Tendering", status: "Completed", detail: "Obligation map adopted." },
              { dept: "Accounts", status: "Completed", detail: "GST-2A reconciliation time reduced." },
              { dept: "Planning", status: "Completed", detail: "Monthly narrative automated." },
              { dept: "Procurement", status: "Pending", detail: "Scheduled for next Tuesday." }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-rule last:border-0">
                <div>
                  <div className="font-semibold">{item.dept}</div>
                  <div className="text-sm text-ink-2 italic">{item.detail}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-mono rounded ${
                  item.status === 'Completed' ? 'bg-ok/10 text-ok border border-ok/20' : 'bg-rule-2/10 text-ink-3 border border-rule-2/20'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressImpact;
