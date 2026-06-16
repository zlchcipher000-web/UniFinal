import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Download, Plus, Filter, Eye, Pencil, MoreVertical } from 'lucide-react';
import { students, payments, tuitionRecords, collectionTrendData, balanceByYearData, topProgramsData, paymentStatusData } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, PieChart, Pie, Cell } from 'recharts';

const allStatuses = ['All', 'Paid', 'Partial', 'Overdue'];
const allCourses = ['All', ...Array.from(new Set(students.map(s => s.course)))];
const allYears = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function TuitionMonitoringPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const setTab = (tab: string) => setSearchParams({ tab });

  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('All');
  const [year, setYear] = useState('All');
  const [balStatus, setBalStatus] = useState('All');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'balances', label: 'Student Balances' },
    { key: 'history', label: 'Payment History' },
    { key: 'reports', label: 'Reports' },
  ];

  const filteredStudents = students.filter(s => {
    const tuition = tuitionRecords.find(t => t.studentId === s.studentId);
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.includes(search) || s.course.toLowerCase().includes(search.toLowerCase());
    const matchCourse = course === 'All' || s.course === course;
    const matchYear = year === 'All' || s.yearLevel === year;
    const matchStatus = balStatus === 'All' || (tuition && tuition.status === balStatus);
    return matchSearch && matchCourse && matchYear && matchStatus;
  });

  const maxProgramAmount = Math.max(...topProgramsData.map(p => p.amount));

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div></div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white"><Download className="w-4 h-4" /> Export</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]"><Plus className="w-4 h-4" /> Bulk Update Payments</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setTab(tab.key)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.key ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)]'}`}>{tab.label}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <StatCard icon={Search} value={542} label="Total enrolled students" iconBg="bg-[var(--sky-blue)]" iconColor="text-[var(--primary-blue)]" />
            <StatCard icon={Search} value={8542000} label="Total amount due" isCurrency iconBg="bg-[var(--sky-blue)]" iconColor="text-[var(--primary-blue)]" />
            <StatCard icon={Search} value={5164200} label="This school year" isCurrency iconBg="bg-[var(--mint-light)]" iconColor="text-[var(--mint-green)]" />
            <StatCard icon={Search} value={3377800} label="Remaining balance" isCurrency iconBg="bg-[var(--amber-light)]" iconColor="text-[var(--amber)]" />
            <div className="card card-padding"><div className="text-[28px] font-bold text-[var(--slate-900)]">60.5%</div><div className="text-xs text-[var(--slate-500)] mt-1">Paid vs Total Due</div></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card">
              <div className="card-padding flex items-center justify-between mb-4"><h2 className="text-base font-semibold">Collection Trend</h2><select className="text-xs border rounded-md px-2 py-1"><option>This Year</option></select></div>
              <div className="h-[240px] px-2 pb-4"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={collectionTrendData}><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="month" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} /><Tooltip contentStyle={{borderRadius:'8px',border:'none',boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}} /><Bar dataKey="collected" fill="var(--primary-blue)" radius={[4,4,0,0]} barSize={24} /><Line type="monotone" dataKey="paid" stroke="var(--mint-green)" strokeWidth={2} dot={false} /></ComposedChart></ResponsiveContainer></div>
            </div>
            <div className="card">
              <div className="card-padding flex items-center justify-between mb-4"><h2 className="text-base font-semibold">Balance by Year Level</h2><select className="text-xs border rounded-md px-2 py-1"><option>This Year</option></select></div>
              <div className="h-[240px] px-2 pb-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={balanceByYearData}><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="year" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} /><Tooltip formatter={(v:number)=>formatPeso(v)} contentStyle={{borderRadius:'8px',border:'none'}} /><Bar dataKey="balance" fill="var(--primary-blue)" radius={[4,4,0,0]} barSize={32} /></BarChart></ResponsiveContainer></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-4">Top Programs by Outstanding Balance</h2>
              <div className="space-y-3">
                {topProgramsData.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1"><span className="text-xs text-[var(--slate-700)]">{p.program}</span><span className="text-xs font-semibold">{formatPeso(p.amount)}</span></div>
                    <div className="h-2 bg-[var(--slate-100)] rounded-full"><div className="h-full bg-[var(--primary-blue)] rounded-full transition-all" style={{width:`${(p.amount/maxProgramAmount)*100}%`}} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-4">Payment Status Overview</h2>
              <div className="h-[160px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>{paymentStatusData.map((e,i)=><Cell key={i} fill={e.fill} />)}</Pie></PieChart></ResponsiveContainer></div>
              <div className="text-center -mt-1 mb-3"><div className="text-2xl font-bold">542</div><div className="text-xs text-[var(--slate-500)]">Total Students</div></div>
              <div className="space-y-1.5">{paymentStatusData.map((d,i)=>(<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:d.fill}}></span><span className="text-xs">{d.name}</span></div><span className="text-xs font-medium">{d.value} ({((d.value/542)*100).toFixed(1)}%)</span></div>))}</div>
            </div>
            <div className="card card-padding">
              <div className="flex items-center justify-between mb-4"><h2 className="text-base font-semibold">Recent Overdue Students</h2><button className="text-xs text-[var(--primary-blue)] hover:underline">View All</button></div>
              <div className="space-y-3">
                {[
                  {name:'Rico Dela Cruz',course:'BS Computer Science, 3rd Year',amount:13000,days:60},
                  {name:'Mark Anthony Tuason',course:'BS Accountancy, 4th Year',amount:10000,days:45},
                  {name:'Pedro Reyes',course:'BS Biology, 2nd Year',amount:7500,days:30},
                  {name:'Lisa Salvador',course:'BSEd Physics, 3rd Year',amount:7200,days:25},
                ].map((s,i)=> (
                  <div key={i} className="flex items-center gap-3"><Avatar name={s.name} size="sm" color={['#EF4444','#F59E0B','#10B981','#2563EB'][i]} /><div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{s.name}</div><div className="text-[10px] text-[var(--slate-500)]">{s.course}</div></div><div className="text-right"><div className="text-[13px] font-semibold text-[var(--red)]">{formatPeso(s.amount)}</div><div className="text-[10px] text-[var(--red)]">{s.days} days</div></div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BALANCES TAB */}
      {activeTab === 'balances' && (
        <div>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" /><input type="text" placeholder="Search student by name, ID or course..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm w-64" /></div>
            <select value={course} onChange={e=>setCourse(e.target.value)} className="px-3 py-2.5 border rounded-md text-sm">{allCourses.map(c=><option key={c}>{c}</option>)}</select>
            <select value={year} onChange={e=>setYear(e.target.value)} className="px-3 py-2.5 border rounded-md text-sm">{allYears.map(y=><option key={y}>{y}</option>)}</select>
            <select value={balStatus} onChange={e=>setBalStatus(e.target.value)} className="px-3 py-2.5 border rounded-md text-sm">{allStatuses.map(s=><option key={s}>{s}</option>)}</select>
            <button className="flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm text-[var(--slate-700)] bg-white"><Filter className="w-4 h-4" /> Filter</button>
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-[var(--slate-100)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Student ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Course</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Year Level</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase">Total Due</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase">Total Paid</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase">Balance</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--slate-100)]">
                  {filteredStudents.map(s => {
                    const tuition = tuitionRecords.find(t => t.studentId === s.studentId);
                    return (
                      <tr key={s.id} className="hover:bg-[var(--slate-50)]">
                        <td className="px-4 py-3"><button onClick={() => navigate(`/tuition-monitoring/${s.id}`)} className="flex items-center gap-2.5 hover:opacity-80"><Avatar name={s.name} color={s.avatarColor} size="sm" /><span className="text-[13px] font-medium text-[var(--primary-blue)]">{s.name}</span></button></td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.studentId}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.course}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{s.yearLevel}</td>
                        <td className="px-4 py-3 text-[13px] text-right font-medium">{formatPeso(tuition?.totalDue || 0)}</td>
                        <td className="px-4 py-3 text-[13px] text-right font-medium text-[var(--mint-green)]">{formatPeso(tuition?.totalPaid || 0)}</td>
                        <td className="px-4 py-3 text-[13px] text-right font-medium">{formatPeso(tuition?.balance || 0)}</td>
                        <td className="px-4 py-3"><StatusBadge status={tuition?.status || 'Partial'} /></td>
                        <td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={()=>navigate(`/tuition-monitoring/${s.id}`)} className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><Eye className="w-4 h-4 text-[var(--slate-400)]" /></button><button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><Pencil className="w-4 h-4 text-[var(--slate-400)]" /></button><button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><MoreVertical className="w-4 h-4 text-[var(--slate-400)]" /></button></div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-[var(--slate-100)] flex items-center justify-between">
              <span className="text-xs text-[var(--slate-500)]">Showing 1 to {filteredStudents.length} of 542 students</span>
              <div className="flex items-center gap-1">{[1,2,3,4,5,'...','78'].map((p,i)=><button key={i} className={`w-8 h-8 rounded-md text-xs ${p===1?'bg-[var(--primary-blue)] text-white':'text-[var(--slate-700)] hover:bg-[var(--slate-100)]'}`}>{p}</button>)}</div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <select className="px-3 py-2.5 border rounded-md text-sm"><option>2025 - 2026</option></select>
            <select className="px-3 py-2.5 border rounded-md text-sm"><option>All Time</option></select>
            <select className="px-3 py-2.5 border rounded-md text-sm"><option>All</option><option>GCash</option><option>Bank Transfer</option><option>Cash</option><option>BDO Online</option></select>
            <select className="px-3 py-2.5 border rounded-md text-sm"><option>All</option><option>Verified</option><option>Pending</option></select>
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-[var(--slate-100)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">OR/Reference No.</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Description</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Payment Method</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Recorded By</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--slate-100)]">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-[var(--slate-50)]">
                      <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{p.date}</td>
                      <td className="px-4 py-3 text-[13px] font-medium">{p.student}</td>
                      <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{p.orNumber}</td>
                      <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{p.description}</td>
                      <td className="px-4 py-3 text-[13px] text-right font-medium">{formatPeso(p.amount)}</td>
                      <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{p.method}</td>
                      <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{p.recordedBy}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-[var(--slate-100)] flex items-center justify-between">
              <span className="text-xs text-[var(--slate-500)]">Showing 1 to {payments.length} of 342 records</span>
              <div className="flex items-center gap-1">{[1,2,3,4,5,'...','43'].map((p,i)=><button key={i} className={`w-8 h-8 rounded-md text-xs ${p===1?'bg-[var(--primary-blue)] text-white':'text-[var(--slate-700)] hover:bg-[var(--slate-100)]'}`}>{p}</button>)}</div>
            </div>
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <StatCard icon={Search} value={8542000} label="Total Tuition Due" isCurrency iconBg="bg-[var(--sky-blue)]" iconColor="text-[var(--primary-blue)]" />
            <StatCard icon={Search} value={5164200} label="Total Paid" isCurrency iconBg="bg-[var(--mint-light)]" iconColor="text-[var(--mint-green)]" />
            <StatCard icon={Search} value={3377800} label="Total Balance" isCurrency iconBg="bg-[var(--amber-light)]" iconColor="text-[var(--amber)]" />
            <div className="card card-padding"><div className="flex items-start justify-between mb-3"><div className="w-10 h-10 rounded-lg bg-[var(--red-light)] flex items-center justify-center"><Search className="w-5 h-5 text-[var(--red)]" /></div></div><div className="text-[28px] font-bold text-[var(--red)]">{formatPeso(1025400)}</div><div className="text-xs text-[var(--slate-500)] mt-1">Overdue Amount</div><div className="text-[10px] text-[var(--slate-400)]">From 62 students</div></div>
            <div className="card card-padding"><div className="text-[28px] font-bold text-[var(--slate-900)]">216</div><div className="text-xs text-[var(--slate-500)] mt-1">Students with Balance</div><div className="text-[10px] text-[var(--slate-400)]">39.85% of total students</div></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card">
              <div className="card-padding flex items-center justify-between mb-4"><h2 className="text-base font-semibold">Collection Trend</h2><select className="text-xs border rounded-md px-2 py-1"><option>This Year</option></select></div>
              <div className="h-[240px] px-2 pb-4"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={collectionTrendData}><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="month" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} /><Tooltip contentStyle={{borderRadius:'8px',border:'none'}} /><Bar dataKey="collected" fill="var(--primary-blue)" radius={[4,4,0,0]} barSize={24} /><Line type="monotone" dataKey="paid" stroke="var(--mint-green)" strokeWidth={2} dot={false} /></ComposedChart></ResponsiveContainer></div>
            </div>
            <div className="card">
              <div className="card-padding flex items-center justify-between mb-4"><h2 className="text-base font-semibold">Balance by Year Level</h2><select className="text-xs border rounded-md px-2 py-1"><option>This Year</option></select></div>
              <div className="h-[240px] px-2 pb-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={balanceByYearData}><CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" /><XAxis dataKey="year" tick={{fontSize:11,fill:'var(--slate-500)'}} /><YAxis tick={{fontSize:11,fill:'var(--slate-500)'}} /><Tooltip formatter={(v:number)=>formatPeso(v)} contentStyle={{borderRadius:'8px',border:'none'}} /><Bar dataKey="balance" fill="var(--primary-blue)" radius={[4,4,0,0]} barSize={32} /></BarChart></ResponsiveContainer></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="card card-padding"><h2 className="text-base font-semibold mb-4">Top Programs by Outstanding Balance</h2><div className="space-y-3">{topProgramsData.map((p,i)=>(<div key={i}><div className="flex justify-between mb-1"><span className="text-xs text-[var(--slate-700)]">{p.program}</span><span className="text-xs font-semibold">{formatPeso(p.amount)}</span></div><div className="h-2 bg-[var(--slate-100)] rounded-full"><div className="h-full bg-[var(--primary-blue)] rounded-full" style={{width:`${(p.amount/maxProgramAmount)*100}%`}} /></div></div>))}</div></div>
            <div className="card card-padding"><h2 className="text-base font-semibold mb-4">Payment Status Overview</h2><div className="h-[160px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>{paymentStatusData.map((e,i)=><Cell key={i} fill={e.fill} />)}</Pie></PieChart></ResponsiveContainer></div><div className="text-center -mt-1 mb-3"><div className="text-2xl font-bold">542</div><div className="text-xs text-[var(--slate-500)]">Total Students</div></div><div className="space-y-1.5">{paymentStatusData.map((d,i)=>(<div key={i} className="flex justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:d.fill}}></span><span className="text-xs">{d.name}</span></div><span className="text-xs font-medium">{d.value} ({((d.value/542)*100).toFixed(1)}%)</span></div>))}</div></div>
            <div className="card card-padding"><div className="flex justify-between mb-4"><h2 className="text-base font-semibold">Recent Overdue Students</h2><button className="text-xs text-[var(--primary-blue)] hover:underline">View All</button></div><div className="space-y-3">{[{name:'Rico Dela Cruz',course:'BS Computer Science, 3rd Year',amount:13000,days:60},{name:'Mark Anthony Tuason',course:'BS Accountancy, 4th Year',amount:10000,days:45},{name:'Pedro Reyes',course:'BS Biology, 2nd Year',amount:7500,days:30},{name:'Lisa Salvador',course:'BSEd Physics, 3rd Year',amount:7200,days:25}].map((s,i)=>(<div key={i} className="flex items-center gap-3"><Avatar name={s.name} size="sm" color={['#EF4444','#F59E0B','#10B981','#2563EB'][i]} /><div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{s.name}</div><div className="text-[10px] text-[var(--slate-500)]">{s.course}</div></div><div className="text-right"><div className="text-[13px] font-semibold text-[var(--red)]">{formatPeso(s.amount)}</div><div className="text-[10px] text-[var(--red)]">{s.days} days</div></div></div>))}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}
