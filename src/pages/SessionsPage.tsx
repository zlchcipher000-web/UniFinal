import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { sessions, sessionOverviewData } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const tabs = ['Ongoing (18)', 'Completed', 'Cancelled', 'All'];

  const filtered = activeTab === 'All' ? sessions : sessions.filter(s => {
    if (activeTab.startsWith('Ongoing')) return s.status === 'Ongoing';
    return s.status === activeTab;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" /><input type="text" placeholder="Search request..." className="pl-9 pr-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm w-56" /></div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Filter className="w-4 h-4" /> Filter</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Download className="w-4 h-4" /> Export Report</button>
      </div>

      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)]'}`}>{tab}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-[var(--slate-100)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Tutor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Schedule</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-[var(--slate-100)]">
                {filtered.map(s => (
                  <tr key={s.id} className={`hover:bg-[var(--slate-50)] ${s.status === 'Ongoing' ? 'border-l-2 border-l-[var(--primary-blue)]' : ''}`}>
                    <td className="px-4 py-3 text-[13px] text-[var(--slate-900)] font-medium">{s.tutor}</td>
                    <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.student}</td>
                    <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.subject}</td>
                    <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.schedule}</td>
                    <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.duration}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-padding">
          <h2 className="text-base font-semibold text-[var(--slate-900)] mb-4">Session Overview</h2>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sessionOverviewData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {sessionOverviewData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-2 mb-3"><div className="text-2xl font-bold text-[var(--slate-900)]">116</div><div className="text-xs text-[var(--slate-500)]">Total Sessions</div></div>
          <div className="space-y-2">
            {sessionOverviewData.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:d.fill}}></span><span className="text-xs text-[var(--slate-700)]">{d.name}</span></div>
                <span className="text-xs font-medium">{d.value} ({((d.value/116)*100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--slate-100)] mt-4 pt-4 space-y-2">
            <div className="flex items-center justify-between"><span className="text-xs text-[var(--slate-500)]">Average Session Duration</span><span className="text-sm font-semibold">1h 23m</span></div>
            <div className="flex items-center justify-between"><span className="text-xs text-[var(--slate-500)]">Session Completion Rate</span><span className="text-sm font-semibold text-[var(--mint-green)]">84%</span></div>
            <div className="h-2 bg-[var(--slate-100)] rounded-full overflow-hidden"><div className="h-full bg-[var(--mint-green)] rounded-full" style={{width:'84%'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
