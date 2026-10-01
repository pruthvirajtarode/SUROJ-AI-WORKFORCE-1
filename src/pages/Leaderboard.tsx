import React from 'react';
import { Trophy, Medal, Target, Users, TrendingUp, Award, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { motion } from 'framer-motion';

const departmentData = [
  { name: 'Accounts', score: 85, completion: 90 },
  { name: 'Admin', score: 72, completion: 85 },
  { name: 'Procurement', score: 92, completion: 95 },
  { name: 'HR', score: 68, completion: 70 },
  { name: 'Engineering', score: 88, completion: 85 },
];

const skillData = [
  { subject: 'Prompting', A: 120, fullMark: 150 },
  { subject: 'Data Analysis', A: 98, fullMark: 150 },
  { subject: 'Communication', A: 86, fullMark: 150 },
  { subject: 'Automation', A: 99, fullMark: 150 },
  { subject: 'Security', A: 85, fullMark: 150 },
  { subject: 'Problem Solving', A: 65, fullMark: 150 },
];

const participationData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Not Started', value: 100 },
];
const COLORS = ['#4E6B2E', '#B58022', '#A03422'];

const topPerformers = [
  { name: 'Sarah Jenkins', dept: 'Procurement', score: 98, badge: 'AI Champion' },
  { name: 'Michael Chen', dept: 'Engineering', score: 95, badge: 'Prompt Master' },
  { name: 'Anita Patel', dept: 'Accounts', score: 94, badge: 'Data Wizard' },
  { name: 'David Okafor', dept: 'Admin', score: 91, badge: 'Efficiency Guru' },
];

export default function Leaderboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-rule pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-ink font-serif flex items-center gap-3">
            <Trophy className="w-10 h-10 text-ochre" />
            Gamification & Leaderboard
          </h1>
          <p className="text-ink-2 mt-2 max-w-2xl text-lg">
            Track department rankings, individual achievements, and overall AI adoption progress across the organization.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-paper-2 border border-rule rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="p-2 bg-ochre/20 rounded-lg"><Target className="w-5 h-5 text-ochre" /></div>
            <div>
              <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider">Overall Score</div>
              <div className="text-xl font-bold text-ink">84.2%</div>
            </div>
          </div>
          <div className="bg-paper-2 border border-rule rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="p-2 bg-rust/20 rounded-lg"><Zap className="w-5 h-5 text-rust" /></div>
            <div>
              <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider">Active Users</div>
              <div className="text-xl font-bold text-ink">342</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Cards */}
      <div>
        <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-rust" /> Top Performers this Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPerformers.map((person, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-paper-2 border border-rule rounded-xl p-5 relative overflow-hidden group hover:border-ochre transition-colors"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                {i === 0 ? <Trophy className="w-12 h-12 text-ochre" /> : <Medal className="w-12 h-12 text-steel" />}
              </div>
              <div className="text-3xl font-bold text-ink mb-1">#{i + 1}</div>
              <div className="font-bold text-lg text-ink truncate">{person.name}</div>
              <div className="text-sm text-ink-2 mb-3">{person.dept}</div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-bold px-2 py-1 bg-ink text-paper rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" /> {person.badge}
                </span>
                <span className="font-bold text-rust">{person.score} pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Ranking Bar Chart */}
        <div className="lg:col-span-2 bg-paper-2 border border-rule p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-steel" /> Department Rankings
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C9C0AA" vertical={false} />
                <XAxis dataKey="name" stroke="#6A6B6C" tick={{ fill: '#3A3D42' }} />
                <YAxis stroke="#6A6B6C" tick={{ fill: '#3A3D42' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F6F2E9', borderColor: '#C9C0AA', borderRadius: '8px', color: '#14161A' }}
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                />
                <Legend />
                <Bar dataKey="score" name="Performance Score" fill="#B0431E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completion" name="Completion Rate (%)" fill="#35566B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participation Pie Chart */}
        <div className="bg-paper-2 border border-rule p-6 rounded-xl shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-ink mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-moss" /> Participation Status
          </h3>
          <div className="flex-1 w-full flex items-center justify-center -mt-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {participationData.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#F6F2E9', borderColor: '#C9C0AA', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Radar Chart */}
        <div className="lg:col-span-3 bg-paper-2 border border-rule p-6 rounded-xl shadow-sm mt-2">
          <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo" /> Skill Acquisition Profile
          </h3>
          <div className="h-96 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                <PolarGrid stroke="#C9C0AA" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#3A3D42', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#6A6B6C" />
                <Radar name="Org Average" dataKey="A" stroke="#B0431E" fill="#B0431E" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#F6F2E9', borderColor: '#C9C0AA', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
