import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sessions } from '../data/sessions';
import { sessionDetails } from '../data/sessionDetails';
import {
  ArrowLeft, Users, FileText, CheckCircle2, BookOpen,
  Wrench, Database, PlayCircle, MessageSquare, Clock,
  AlertTriangle, ChevronDown, ChevronUp, BarChart2,
  PieChart as PieChartIcon, TrendingUp, Copy, ExternalLink,
  Check, Zap, X, Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tiny Chart Components (CSS-only, no library needed) ───────────────────────

const BarChart = ({ data }: { data: { label: string; value: number; color?: string }[] }) => {
  const max = Math.max(...data.map(d => Math.abs(d.value)), 1);
  return (
    <div className="space-y-3 mt-4">
      {data.map((d, i) => {
        const pct = (Math.abs(d.value) / max) * 100;
        const isNeg = d.value < 0;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="text-xs font-mono text-ink-2 w-44 shrink-0 text-right leading-tight">{d.label}</div>
            <div className="flex-1 h-6 bg-paper-3 rounded overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="absolute top-0 bottom-0 left-0 rounded"
                style={{ backgroundColor: isNeg ? '#5C6A3A' : (d.color || '#B0431E') }}
              />
              <span className="absolute inset-y-0 left-2 flex items-center text-[10px] font-mono font-bold text-paper z-10">
                {typeof d.value === 'number' && d.value % 1 !== 0 ? d.value.toFixed(1) : d.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PieChart = ({ data }: { data: { label: string; value: number; color?: string }[] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const radius = 70;
  const cx = 90;
  const cy = 90;

  const slices = data.map(d => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    return { ...d, startAngle, endAngle, pct: ((d.value / total) * 100).toFixed(1) };
  });

  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const describeArc = (start: number, end: number) => {
    if (end - start >= 360) end = 359.99;
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y} Z`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
      <svg width="180" height="180" className="shrink-0">
        {slices.map((s, i) => (
          <motion.path
            key={i}
            d={describeArc(s.startAngle, s.endAngle)}
            fill={s.color || '#B0431E'}
            stroke="var(--color-paper, #F6F2E9)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </svg>
      <div className="space-y-2 flex-1">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-ink-2 flex-1 text-xs leading-tight">{s.label}</span>
            <span className="font-mono text-xs font-bold text-ink">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Interactive Dataset Block ────────────────────────────────────────────────

const InteractiveDataset = ({ title, content }: { title: string; content: string }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement('textarea');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openInChatGPT = () => {
    const encoded = encodeURIComponent(
      `I am working on an AI training session for Suroj Buildcon construction company. Below is a synthetic dataset for a hands-on exercise. Please help me work through it using structured extraction and analysis.\n\n${content}`
    );
    window.open(`https://chat.openai.com/?q=${encoded}`, '_blank');
  };

  const openInClaude = () => {
    // Claude doesn't support URL pre-fill but we copy and open
    handleCopy();
    window.open('https://claude.ai/new', '_blank');
  };

  return (
    <div className="border border-rule-2 rounded-md overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="bg-paper-3 border-b border-rule flex items-center justify-between px-4 py-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-mono text-xs font-bold text-ink uppercase tracking-wider flex-1 text-left"
        >
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {title}
        </button>
        {/* Action buttons — always visible */}
        <div className="flex items-center gap-2 ml-3">
          <button
            onClick={handleCopy}
            title="Copy dataset to clipboard"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border border-rule-2 bg-paper hover:bg-paper-2 transition-colors text-ink-2 hover:text-ink"
          >
            {copied ? <Check size={11} className="text-ok" /> : <Copy size={11} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={openInClaude}
            title="Copy dataset then open Claude AI"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border border-rule-2 bg-[#D97757] text-white hover:bg-[#c5623f] transition-colors"
          >
            <Zap size={11} />
            Claude
          </button>
          <button
            onClick={openInChatGPT}
            title="Open dataset in ChatGPT"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-[#10A37F] text-white hover:bg-[#0d8f6e] transition-colors"
          >
            <ExternalLink size={11} />
            ChatGPT
          </button>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <pre className="p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-ink-2 bg-[#FDFBF5] max-h-96 overflow-y-auto border-t border-rule">
                {content}
              </pre>
              {/* Floating copy button inside content */}
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 bg-paper border border-rule rounded shadow text-ink-3 hover:text-ink transition-colors"
                title="Copy"
              >
                {copied ? <Check size={12} className="text-ok" /> : <Copy size={12} />}
              </button>
            </div>
            {/* Bottom action strip */}
            <div className="bg-paper-3 border-t border-rule px-4 py-2 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono text-ink-3 mr-auto">
                {content.split('\n').length} lines · {(content.length / 1024).toFixed(1)} KB
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-rule-2 bg-paper hover:bg-paper-2 transition-colors text-ink-2"
              >
                {copied ? <Check size={11} className="text-ok" /> : <Copy size={11} />}
                {copied ? 'Copied to clipboard!' : 'Copy all data'}
              </button>
              <button
                onClick={openInClaude}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#D97757] text-white hover:bg-[#c5623f] transition-colors"
              >
                <Zap size={11} /> Copy &amp; Open Claude
              </button>
              <button
                onClick={openInChatGPT}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#10A37F] text-white hover:bg-[#0d8f6e] transition-colors"
              >
                <ExternalLink size={11} /> Open in ChatGPT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Tab Definitions ──────────────────────────────────────────────────────────

type TabId = 'agenda' | 'theory' | 'prompts' | 'dataset' | 'exercise' | 'charts';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'agenda', label: 'Agenda', icon: Clock },
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'prompts', label: 'Prompts', icon: FileText },
  { id: 'dataset', label: 'Dataset', icon: Database },
  { id: 'exercise', label: 'Exercises', icon: PlayCircle },
  { id: 'charts', label: 'Charts', icon: BarChart2 },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const SessionDetail = () => {
  const { id } = useParams();
  const session = sessions.find(s => s.id === Number(id));
  const detail = sessionDetails[Number(id)];
  const [activeTab, setActiveTab] = useState<TabId>('agenda');
  const [zoomedChart, setZoomedChart] = useState<'bar' | 'pie' | null>(null);

  if (!session) return <div className="p-8 text-ink-2">Session not found</div>;

  const accentColor = {
    rust: '#B0431E', brick: '#7A2E1F', indigo: '#2E3F63',
    steel: '#35566B', slate: '#445362', ochre: '#B58022',
    iron: '#4A4A4A', moss: '#5C6A3A'
  }[session.color] || '#B0431E';

  return (
    <div className="space-y-0 animate-fade-in pb-16">
      {/* ── Back ── */}
      <Link to="/sessions" className="inline-flex items-center text-sm font-mono text-ink-3 hover:text-ink transition-colors mb-6">
        <ArrowLeft size={14} className="mr-2" />Back to Sessions
      </Link>

      {/* ── Header ── */}
      <div className="border-b-4 pb-6 mb-0" style={{ borderColor: accentColor }}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-ink-3 tracking-widest mb-3 uppercase">
              Session 0{session.id} · {session.family}
            </div>
            <h1 className="text-4xl font-semibold mb-4">{session.title}</h1>
            <p className="text-xl text-ink-2 font-serif italic max-w-3xl leading-relaxed">
              {session.objective}
            </p>
          </div>
          <div className="bg-paper-2 border border-rule-2 rounded-md p-4 min-w-[220px] shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-xs text-ink-3 uppercase">Headcount</span>
              <span className="flex items-center font-bold text-lg">
                <Users size={18} className="mr-2 text-ink-3" />{session.headcount}
              </span>
            </div>
            {session.departments.length > 0 && (
              <div className="space-y-1 border-t border-rule pt-3">
                {session.departments.map(dept => (
                  <div key={dept.name} className="flex justify-between text-xs">
                    <span className="text-ink-2 truncate mr-2">{dept.name}</span>
                    <span className="font-mono font-bold">{dept.count}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 border-t border-rule pt-3 text-xs font-mono text-ink-3">
              FAMILY: {session.family}
            </div>
          </div>
        </div>
      </div>

      {/* ── Problem / Opportunity Cards ── */}
      <div className="grid md:grid-cols-2 gap-4 py-6">
        <div className="bg-paper border-l-4 p-5 rounded-r-md shadow-sm" style={{ borderLeftColor: accentColor }}>
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: accentColor }} />The Real Problem
          </h3>
          <p className="text-ink-2 leading-relaxed text-sm">{session.problem}</p>
        </div>
        <div className="bg-paper border-l-4 border-ok p-5 rounded-r-md shadow-sm">
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-ok" />The AI Opportunity
          </h3>
          <p className="text-ink-2 leading-relaxed text-sm">{session.aiOpportunity}</p>
        </div>
      </div>

      {/* Tools row removed as per request */}

      {/* ── Tab Bar ── */}
      {detail && (
        <>
          <div className="flex gap-0 border-b border-rule-2 overflow-x-auto mt-0 -mx-0 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-current text-ink font-semibold'
                    : 'border-transparent text-ink-3 hover:text-ink-2'
                }`}
                style={activeTab === tab.id ? { borderBottomColor: accentColor, color: accentColor } : {}}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab Panels ── */}
          <div className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >

                {/* ─── AGENDA ─── */}
                {activeTab === 'agenda' && (
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold">Session Agenda</h2>
                    <div className="space-y-2">
                      {detail.agenda.map((item, i) => {
                        const parts = item.split(' · ');
                        const time = parts[0];
                        const desc = parts.slice(1).join(' · ');
                        return (
                          <div key={i} className="grid grid-cols-[130px_1fr] gap-4 py-3 border-b border-rule last:border-0">
                            <span className="font-mono text-xs text-ink-3">{time}</span>
                            <span className="text-sm text-ink-2">{desc}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Case Study Card */}
                    <div className="mt-8 bg-paper-2 border border-rule-2 rounded-md p-6 shadow-sm">
                      <div className="font-mono text-xs text-ink-3 uppercase tracking-widest mb-3">Case Study</div>
                      <h3 className="text-lg font-semibold mb-3">{detail.caseStudy.title}</h3>
                      <p className="text-sm text-ink-2 leading-relaxed mb-4">{detail.caseStudy.story}</p>
                      <div className="bg-paper border-l-4 border-ok p-4 rounded-r mb-3">
                        <div className="text-xs font-mono font-bold text-ok mb-1">WHAT CHANGED WITH AI</div>
                        <p className="text-sm text-ink-2">{detail.caseStudy.outcome}</p>
                      </div>
                      <div className="bg-paper border border-rule-2 p-4 rounded">
                        <div className="text-xs font-mono font-bold text-ink-3 mb-1">TAKEAWAY FOR THE ROOM</div>
                        <p className="text-sm text-ink-2 italic">{detail.caseStudy.takeaway}</p>
                      </div>
                    </div>

                    {/* Closing Q&A */}
                    <div className="mt-6 border border-rule-2 rounded-md p-5">
                      <div className="font-mono text-xs text-ink-3 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MessageSquare size={12} />Closing Q&A Prompts
                      </div>
                      <ol className="space-y-2">
                        {detail.closingQA.map((q, i) => (
                          <li key={i} className="text-sm text-ink-2 flex gap-3">
                            <span className="font-mono text-ink-3 shrink-0">{i + 1}.</span>
                            <span className="font-serif italic">{q}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {/* ─── THEORY ─── */}
                {activeTab === 'theory' && (
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span style={{ color: accentColor }}>✦</span> Theoretical Foundation
                    </h2>
                    <p className="text-ink-2 font-serif italic text-base leading-relaxed">
                      {session.objective}
                    </p>

                    {/* Theory Blocks */}
                    <div className="space-y-4 mt-4">
                      {detail.theory.map((item, i) => (
                        <div key={i} className="border border-rule-2 bg-paper-2 rounded-md p-5">
                          <h4 className="font-mono text-xs font-bold text-ink uppercase tracking-widest mb-3">
                            {item.title}
                          </h4>
                          <p className="text-sm text-ink-2 leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Pitfalls */}
                    <div className="bg-[#F5E4D8] border border-danger/20 rounded-md p-5 mt-6">
                      <div className="font-mono text-xs font-bold text-danger uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertTriangle size={12} />Common Pitfalls In This Room
                      </div>
                      <ul className="space-y-2">
                        {detail.pitfalls.map((p, i) => (
                          <li key={i} className="text-sm text-ink-2 flex gap-3">
                            <span className="text-danger font-bold shrink-0">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ─── PROMPTS ─── */}
                {activeTab === 'prompts' && (
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold">Prompt Patterns for This Room</h2>
                    <p className="text-sm text-ink-2">
                      These prompts are designed for {session.title}. Each follows the five-part anatomy:
                      <span className="font-mono bg-paper-3 px-1 mx-1 text-xs">Role → Context → Task → Format → Rules</span>
                    </p>

                    {/* Generic reusable prompt */}
                    <div className="bg-[#1B1E22] text-[#E4DCC8] p-5 rounded-md font-mono text-xs leading-relaxed shadow-md">
                      <div className="text-ochre font-bold mb-3">// Core Prompt Pattern (reusable across all sessions)</div>
                      <pre className="whitespace-pre-wrap">{`You are a [ROLE] at Suroj Buildcon.
The document below is [CONTEXT].

TASK:
Extract [SPECIFIC INFORMATION] and list any ambiguities.

FORMAT:
Table with columns: [COL 1], [COL 2], [COL 3]

RULES:
- Cite the exact clause for every point.
- Do not add information not present in the document.
- If unclear, mark it "unclear" — do not guess.`}</pre>
                    </div>

                    {/* Session-specific patterns */}
                    {detail.prompts.map((p, i) => (
                      <div key={i} className="border border-rule-2 rounded-md overflow-hidden">
                        <div className="bg-paper-3 px-4 py-2 font-mono text-xs font-bold text-ink uppercase tracking-wider border-b border-rule">
                          {p.title}
                        </div>
                        <div className="bg-[#1B1E22] text-[#E4DCC8] p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre-wrap">{p.prompt}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ─── DATASET ─── */}
                {activeTab === 'dataset' && (
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold">Synthetic Datasets</h2>
                    <p className="text-sm text-ink-2 leading-relaxed">
                      Every company name, employee name, GSTIN, PAN, and financial figure below is synthetic.
                      Any resemblance to real Suroj vendors, employees, or projects is coincidental.
                      These are teaching materials only.
                    </p>
                    <div className="bg-[#E6EBDA] border border-ok/20 rounded p-3 text-sm text-ok font-medium flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Safe to use in public AI tools — all real identifiers have been replaced.
                    </div>

                    {detail.exercises.map((ex, i) =>
                      ex.dataset ? (
                        <div key={i}>
                        <InteractiveDataset
                            title={`DATASET · ${ex.title}`}
                            content={ex.dataset}
                          />
                        </div>
                      ) : null
                    )}

                    {/* If no datasets exist, show a message */}
                    {!detail.exercises.some(e => e.dataset) && (
                      <div className="bg-paper-2 border border-rule-2 rounded-md p-6 text-center">
                        <Database size={32} className="mx-auto mb-3 text-ink-3" />
                        <p className="text-ink-2 text-sm">
                          This session's exercises use documents provided by participants. Ask attendees to bring one real document from their current week's work — a tender, a quotation, a notice, a meeting transcript.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ─── EXERCISES ─── */}
                {activeTab === 'exercise' && (
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold">Hands-On Exercises</h2>

                    {detail.exercises.map((ex, i) => (
                      <div key={i} className="border border-rule-2 bg-[#FDFBF5] rounded-md overflow-hidden shadow-sm">
                        <div className="bg-paper-3 px-5 py-3 flex items-center justify-between border-b border-rule">
                          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">{ex.title}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-ink-3">{ex.level}</span>
                            <span className="border border-rule-2 rounded px-2 py-0.5 text-xs font-mono text-ink-2 flex items-center gap-1">
                              <Clock size={10} />{ex.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 space-y-4">
                          <div>
                            <div className="text-xs font-mono font-bold text-ink-3 mb-2 uppercase">Setup</div>
                            <p className="text-sm text-ink-2 leading-relaxed">{ex.setup}</p>
                          </div>
                          {ex.dataset && (
                          <InteractiveDataset title="SYNTHETIC DATA FOR THIS EXERCISE" content={ex.dataset} />
                          )}
                          <div className="bg-paper-2 border border-rule rounded p-4">
                            <div className="font-mono text-xs font-bold text-ink-3 uppercase mb-2 flex items-center gap-1">
                              <Wrench size={10} />Facilitator Debrief
                            </div>
                            <p className="text-sm text-ink-2 italic">{ex.debrief}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Link to Data Lab */}
                    <div className="border border-rule-2 bg-paper-2 p-5 rounded-md flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm mb-1">Generate More Synthetic Data</div>
                        <p className="text-xs text-ink-2">Use the Synthetic Data Lab to generate additional test documents.</p>
                      </div>
                      <Link
                        to="/data-lab"
                        className="inline-flex px-4 py-2 bg-ink text-paper text-xs font-semibold rounded hover:bg-ink-2 transition-colors whitespace-nowrap"
                      >
                        Open Synthetic Data Lab →
                      </Link>
                    </div>
                  </div>
                )}

                {/* ─── CHARTS ─── */}
                {activeTab === 'charts' && (
                  <div className="space-y-8 w-full">
                    <h2 className="text-xl font-semibold">Data & Impact Visualisations</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Bar Chart */}
                      {detail.charts.bar && detail.charts.bar.length > 0 && (
                        <div className="border border-rule-2 bg-paper-2 rounded-md p-6 shadow-sm relative group cursor-pointer" onClick={() => setZoomedChart('bar')}>
                          <button className="absolute top-4 right-4 p-2 bg-paper rounded-full border border-rule shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-ink-2 hover:text-ink">
                            <Maximize2 size={16} />
                          </button>
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} style={{ color: accentColor }} />
                            <h3 className="font-semibold text-sm">Key Metrics — {session.title}</h3>
                          </div>
                          <p className="text-xs text-ink-3 mb-1">
                            Comparative data illustrating the impact of AI-assisted workflows.
                          </p>
                          <BarChart data={detail.charts.bar} />
                        </div>
                      )}

                      {/* Pie Chart */}
                      {(detail.charts.pie || detail.charts.donut) && (
                        <div className="border border-rule-2 bg-paper-2 rounded-md p-6 shadow-sm relative group cursor-pointer" onClick={() => setZoomedChart('pie')}>
                          <button className="absolute top-4 right-4 p-2 bg-paper rounded-full border border-rule shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-ink-2 hover:text-ink">
                            <Maximize2 size={16} />
                          </button>
                          <div className="flex items-center gap-2 mb-2">
                            <PieChartIcon size={16} style={{ color: accentColor }} />
                            <h3 className="font-semibold text-sm">Distribution Analysis</h3>
                          </div>
                          <p className="text-xs text-ink-3 mb-1">
                            Breakdown of categories and patterns in this session's domain.
                          </p>
                          <PieChart data={(detail.charts.pie || detail.charts.donut)!} />
                        </div>
                      )}
                    </div>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {detail.charts.bar?.slice(0, 4).map((d, i) => (
                        <div key={i} className="border border-rule-2 bg-paper-2 rounded-md p-4 text-center">
                          <div className="text-2xl font-bold mb-1" style={{ color: d.color || accentColor }}>
                            {typeof d.value === 'number' && d.value > 100
                              ? `₹${d.value}`
                              : `${d.value}${typeof d.value === 'number' && d.value < 100 && String(d.value).includes('.') ? '' : ''}`}
                          </div>
                          <div className="text-xs font-mono text-ink-3 leading-tight">{d.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Session-wide stats from sessions data */}
                    <div className="border border-rule-2 bg-paper-2 rounded-md p-6">
                      <h3 className="font-semibold text-sm mb-4">Session Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-3xl font-bold" style={{ color: accentColor }}>{session.headcount}</div>
                          <div className="text-xs font-mono text-ink-3 mt-1">PARTICIPANTS</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold" style={{ color: accentColor }}>{detail.exercises.length}</div>
                          <div className="text-xs font-mono text-ink-3 mt-1">EXERCISES</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold" style={{ color: accentColor }}>{detail.prompts.length}</div>
                          <div className="text-xs font-mono text-ink-3 mt-1">PROMPT PATTERNS</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold" style={{ color: accentColor }}>{detail.theory.length}</div>
                          <div className="text-xs font-mono text-ink-3 mt-1">THEORY BLOCKS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Fallback for sessions without detail data */}
      {!detail && (
        <div className="mt-6 bg-paper-2 border border-rule-2 rounded p-6 text-center text-ink-2">
          Detailed curriculum content for this session is coming soon.
        </div>
      )}
      {/* Zoomed Chart Modal */}
      <AnimatePresence>
        {zoomedChart && detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setZoomedChart(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="bg-paper p-8 rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto relative"
            >
              <button
                onClick={() => setZoomedChart(null)}
                className="absolute top-4 right-4 p-2 bg-paper-2 hover:bg-paper-3 rounded-full transition-colors"
              >
                <X size={20} className="text-ink-2" />
              </button>
              
              {zoomedChart === 'bar' && detail.charts.bar && (
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-rule pb-4">
                    <TrendingUp size={24} style={{ color: accentColor }} />
                    <h2 className="text-2xl font-semibold">Key Metrics — {session.title}</h2>
                  </div>
                  <div className="scale-125 origin-top-left p-4 mt-8 pb-32">
                    <BarChart data={detail.charts.bar} />
                  </div>
                </div>
              )}
              
              {zoomedChart === 'pie' && (detail.charts.pie || detail.charts.donut) && (
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-rule pb-4">
                    <PieChartIcon size={24} style={{ color: accentColor }} />
                    <h2 className="text-2xl font-semibold">Distribution Analysis</h2>
                  </div>
                  <div className="scale-150 origin-top flex justify-center mt-16 pb-24">
                    <PieChart data={(detail.charts.pie || detail.charts.donut)!} />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SessionDetail;
