import React from 'react';
import { Link } from 'react-router-dom';
import { sessions } from '../data/sessions';
import { Users } from 'lucide-react';

const SessionsIndex = () => {
  return (
    <div className="space-y-8">
      <div className="border-b border-rule-2 pb-6">
        <h1 className="text-3xl font-semibold">8 Sessions</h1>
        <p className="text-lg text-ink-2 mt-4 font-serif italic max-w-2xl">
          Detailed workshop modules tailored for specific Suroj departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Link 
            key={session.id} 
            to={`/sessions/${session.id}`}
            className="group flex flex-col bg-paper border border-rule-2 hover:border-ink transition-colors rounded-md overflow-hidden shadow-sm"
          >
            <div className={`h-2 w-full`} style={{
              backgroundColor: session.color === 'rust' ? '#B0431E' :
                session.color === 'brick' ? '#7A2E1F' :
                session.color === 'indigo' ? '#2E3F63' :
                session.color === 'steel' ? '#35566B' :
                session.color === 'slate' ? '#445362' :
                session.color === 'ochre' ? '#B58022' :
                session.color === 'iron' ? '#4A4A4A' : '#5C6A3A'
            }}></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="font-mono text-xs text-ink-3 tracking-widest mb-2">SESSION 0{session.id}</div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-rust transition-colors">{session.title}</h3>
              <p className="text-sm text-ink-2 mb-6 flex-1 line-clamp-3">{session.objective}</p>
              
              <div className="flex items-center justify-between border-t border-rule pt-4 mt-auto">
                <span className="font-mono text-xs text-ink-3">{session.family}</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Users size={14} className="text-ink-3" />
                  {session.headcount}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SessionsIndex;
