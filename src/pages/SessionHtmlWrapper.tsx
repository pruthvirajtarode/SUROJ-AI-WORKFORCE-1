import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sessions } from '../data/sessions';
import { Trophy, TrendingUp, Star, Award, ArrowLeft, Target, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const SessionHtmlWrapper = () => {
  const { id } = useParams();
  const session = sessions.find(s => s.id === Number(id));

  if (!session || !session.htmlUrl) return <div className="p-8">Session not found or not dynamic.</div>;

  const metricsData = [
    { name: 'Completion', value: Math.floor(Math.random() * 30) + 70, color: '#B0431E' },
    { name: 'Engagement', value: Math.floor(Math.random() * 20) + 80, color: '#35566B' },
    { name: 'Quizzes', value: Math.floor(Math.random() * 40) + 60, color: '#B58022' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <Link to="/sessions" className="inline-flex items-center text-sm font-mono text-ink-3 hover:text-ink transition-colors mb-2">
        <ArrowLeft size={14} className="mr-2" />Back to Sessions
      </Link>
      
      {/* Gamification Header for HTML Pages */}
      <div className="bg-paper-2 border border-rule p-8 rounded-xl shadow-sm mb-4">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold font-serif mb-2 flex items-center gap-3">
              <Trophy className="text-ochre w-8 h-8" /> Gamified Performance
            </h2>
            <p className="text-ink-2 mb-6">Live metrics and participant engagement for {session.title}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-paper border border-rule p-4 rounded-lg text-center shadow-sm">
                 <Star className="w-6 h-6 text-rust mx-auto mb-2" />
                 <div className="text-2xl font-bold text-ink">450</div>
                 <div className="text-xs text-ink-3 font-mono mt-1">XP EARNED</div>
               </div>
               <div className="bg-paper border border-rule p-4 rounded-lg text-center shadow-sm">
                 <Award className="w-6 h-6 text-indigo mx-auto mb-2" />
                 <div className="text-2xl font-bold text-ink">12</div>
                 <div className="text-xs text-ink-3 font-mono mt-1">BADGES</div>
               </div>
               <div className="bg-paper border border-rule p-4 rounded-lg text-center shadow-sm">
                 <Target className="w-6 h-6 text-moss mx-auto mb-2" />
                 <div className="text-2xl font-bold text-ink">85%</div>
                 <div className="text-xs text-ink-3 font-mono mt-1">ACCURACY</div>
               </div>
               <div className="bg-paper border border-rule p-4 rounded-lg text-center shadow-sm">
                 <Users className="w-6 h-6 text-steel mx-auto mb-2" />
                 <div className="text-2xl font-bold text-ink">{session.headcount}</div>
                 <div className="text-xs text-ink-3 font-mono mt-1">PARTICIPANTS</div>
               </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-48 bg-paper border border-rule rounded-lg p-4 shadow-sm">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={metricsData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DCD0" />
                 <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                 <Tooltip cursor={{fill: '#F5F5F5'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                 <Bar dataKey="value" radius={[4,4,0,0]} maxBarSize={40}>
                   {metricsData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Render the actual HTML via Iframe to isolate CSS */}
      <div className="w-full rounded-xl overflow-hidden shadow-md border border-rule bg-white h-[850px]">
        <iframe 
          src={session.htmlUrl} 
          className="w-full h-full border-none" 
          title={session.title}
        />
      </div>
    </div>
  );
};

export default SessionHtmlWrapper;
