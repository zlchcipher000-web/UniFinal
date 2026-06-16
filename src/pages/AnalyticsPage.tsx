import { useState } from 'react';
import { BarChart3, Users, Bell, CheckCircle, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { requestsVsSessionsData, tutorPerformanceData, subjectDemandData, analyticsEarningsData } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';

const summaryStats = [
  { icon: BarChart3, value: 387, label: 'Total Sessions', color: 'text-[var(--primary-blue)]', bg: 'bg-[var(--sky-blue)]' },
  { icon: Users, value: 116, label: 'Active Tutors', color: 'text-[var(--mint-green)]', bg: 'bg-[var(--mint-light)]' },
  { icon: Bell, value: 54, label: 'New Requests', color: 'text-[var(--amber)]', bg: 'bg-[var(--amber-light)]' },
  { icon: CheckCircle, value: '97%', label: 'Completion Rate', color: 'text-[var(--mint-green)]', bg: 'bg-[var(--mint-light)]' },
  { icon: TrendingUp, value: '84%', label: 'Satisfaction Rate', color: 'text-[var(--primary-blue)]', bg: 'bg-[var(--sky-blue)]' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('This Month');

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div></div>
        <div className="flex items-center gap-3">
          <select value={period} onChange={e => setPeriod(e.target.value)} className="px-3 py-2 border border-[var(--slate-200)] rounded-md text-sm"><option>This Month</option><option>This Semester</option><option>This Year</option></select>
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white"><Download className="w-4 h-4" /> Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {summaryStats.map((s, i) => (
          <div key={i} className="card card-padding flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div><div className="text-xl font-bold text-[var(--slate-900)]">{s.value}</div><div className="text-xs text-[var(--slate-500)]">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Requests vs Sessions</h2></div>
          <div className="p-4 h-[280px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={requestsVsSessionsData}><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="month" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} /><Tooltip contentStyle={{borderRadius:'8px',border:'none'}} /><Legend /><Bar dataKey="requests" fill="var(--primary-blue)" radius={[4,4,0,0]} barSize={16} /><Bar dataKey="sessions" fill="var(--mint-green)" radius={[4,4,0,0]} barSize={16} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="card">
          <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Subject Demand</h2></div>
          <div className="p-4 flex items-center">
            <div className="h-[240px] w-1/2"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={subjectDemandData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={0}>{subjectDemandData.map((e,i)=><Cell key={i} fill={e.fill} />)}</Pie></PieChart></ResponsiveContainer></div>
            <div className="w-1/2 space-y-2"><div className="text-center mb-3"><div className="text-2xl font-bold">387</div><div className="text-xs text-[var(--slate-500)]">Total</div></div>{subjectDemandData.map((d,i)=>(<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:d.fill}}></span><span className="text-xs">{d.subject}</span></div><span className="text-xs font-medium">{d.value}%</span></div>))}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Tutor Performance Top 15</h2></div>
          <div className="p-4 h-[280px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={tutorPerformanceData} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis type="number" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis dataKey="tutor" type="category" tick={{fontSize:11,fill:'var(--slate-500)'}} width={100} /><Tooltip contentStyle={{borderRadius:'8px',border:'none'}} /><Bar dataKey="score" fill="var(--primary-blue)" radius={[0,4,4,0]} barSize={16} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="card">
          <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Earnings Trend (₱)</h2></div>
          <div className="p-4 h-[280px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={analyticsEarningsData}><defs><linearGradient id="analGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.15}/><stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="month" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} tickFormatter={(v:number)=>`₱${(v/1000).toFixed(0)}K`} /><Tooltip formatter={(v:number)=>formatPeso(v)} contentStyle={{borderRadius:'8px',border:'none'}} /><Area type="monotone" dataKey="earnings" stroke="var(--primary-blue)" strokeWidth={2} fill="url(#analGrad)" /></AreaChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}
