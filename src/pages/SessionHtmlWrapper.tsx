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
    <div className="space-y-4 animate-in fade-in duration-500 pb-12 h-[calc(100vh-60px)] flex flex-col">
      <Link to="/sessions" className="inline-flex items-center text-sm font-mono text-ink-3 hover:text-ink transition-colors shrink-0">
        <ArrowLeft size={14} className="mr-2" />Back to Sessions
      </Link>

      {/* Render the actual HTML via Iframe */}
      <div className="w-full flex-1 rounded-xl overflow-hidden shadow-md border border-rule bg-white">
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
