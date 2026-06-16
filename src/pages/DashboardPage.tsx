import { useNavigate } from 'react-router-dom';
import { Users, Bell, Calendar, Wallet, ChevronRight } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { recentActivities, monthlyOverviewData } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const topTutors = [
  { name: 'Maria Santos', sessions: 56, earnings: 18000, color: '#2563EB' },
  { name: 'Juan Cruz', sessions: 42, earnings: 12500, color: '#10B981' },
  { name: 'Pedro Reyes', sessions: 30, earnings: 8500, color: '#F59E0B' },
];

const subjects = [
  { name: 'Mathematics', percent: 45, color: '#2563EB' },
  { name: 'English', percent: 25, color: '#10B981' },
  { name: 'Science', percent: 15, color: '#7C3AED' },
  { name: 'Programming', percent: 15, color: '#F59E0B' },
];

const pendingRequests = [
  { name: 'Ana Dela Cruz', subject: 'Grade 10 - Math', tutor: 'Maria Santos', color: '#EC4899' },
  { name: 'John Mark P.', subject: 'Grade 12 - Calculus', tutor: 'Juan Cruz', color: '#10B981' },
  { name: 'Lisa Salvador', subject: 'Grade 11 - Physics', tutor: 'Pedro Reyes', color: '#2563EB' },
  { name: 'Carla Mendoza', subject: 'Grade 9 - English', tutor: '(none yet)', color: '#7C3AED' },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users} value={542} label="Total registered tutors" trend={12} iconBg="bg-[var(--sky-blue)]" iconColor="text-[var(--primary-blue)]" />
        <StatCard icon={Bell} value={23} label="Pending review" trend={-8} iconBg="bg-[var(--amber-light)]" iconColor="text-[var(--amber)]" />
        <StatCard icon={Calendar} value={116} label="Currently active" trend={15} iconBg="bg-[var(--mint-light)]" iconColor="text-[var(--mint-green)]" />
        <StatCard icon={Wallet} value={284500} label="Total earnings this month" trend={10} isCurrency iconBg="bg-[var(--purple-light)]" iconColor="text-[var(--purple-accent)]" />
      </div>

      {/* Two Column Middle */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Recent Pending Requests */}
        <div className="lg:col-span-3 card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Recent Pending Requests</h2>
            <button onClick={() => navigate('/requests')} className="text-sm text-[var(--primary-blue)] hover:underline">View all</button>
          </div>
          <div className="divide-y divide-[var(--slate-100)]">
            {pendingRequests.map((req, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-[var(--slate-50)] cursor-pointer transition-colors" onClick={() => navigate('/requests')}>
                <Avatar name={req.name} color={req.color} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[var(--slate-900)] truncate">{req.name}</div>
                  <div className="text-xs text-[var(--slate-500)]">{req.subject}</div>
                  <div className="text-xs text-[var(--slate-400)]">Tutor: {req.tutor}</div>
                </div>
                <StatusBadge status="Pending" />
                <ChevronRight className="w-4 h-4 text-[var(--slate-400)]" />
              </div>
            ))}
          </div>
          <div className="card-padding pt-2">
            <button onClick={() => navigate('/requests')} className="text-sm text-[var(--primary-blue)] font-medium hover:underline">Go to Requests Center →</button>
          </div>
        </div>

        {/* Monthly Overview Chart */}
        <div className="lg:col-span-2 card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Monthly Overview</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--primary-blue)]"></span>Requests</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--mint-green)]"></span>Sessions</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--amber)]"></span>Earnings</span>
            </div>
          </div>
          <div className="px-2 pb-4 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyOverviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar yAxisId="left" dataKey="requests" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="var(--mint-green)" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="earnings" stroke="var(--amber)" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="card-padding pt-0">
            <button onClick={() => navigate('/analytics')} className="text-sm text-[var(--primary-blue)] font-medium hover:underline">Go to Analytics →</button>
          </div>
        </div>
      </div>

      {/* Three Column Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Tutors */}
        <div className="card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Top Tutors by Earnings</h2>
            <button className="text-sm text-[var(--primary-blue)] hover:underline">View all</button>
          </div>
          <div className="divide-y divide-[var(--slate-100)]">
            {topTutors.map((tutor, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <span className="text-sm font-bold text-[var(--slate-500)] w-4">{i + 1}</span>
                <Avatar name={tutor.name} color={tutor.color} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[var(--slate-900)]">{tutor.name}</div>
                  <div className="text-xs text-[var(--slate-500)]">{tutor.sessions} sessions</div>
                </div>
                <div className="text-[13px] font-semibold text-[var(--slate-900)]">{formatPeso(tutor.earnings)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Requested Subjects */}
        <div className="card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Most Requested Subjects</h2>
            <button className="text-sm text-[var(--primary-blue)] hover:underline">View all</button>
          </div>
          <div className="space-y-4 px-5 pb-5">
            {subjects.map((subj, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[var(--slate-700)]">{subj.name}</span>
                  <span className="text-xs font-semibold text-[var(--slate-700)]">{subj.percent}%</span>
                </div>
                <div className="h-2 bg-[var(--slate-100)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${subj.percent}%`, backgroundColor: subj.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Recent Activity</h2>
            <button className="text-sm text-[var(--primary-blue)] hover:underline">View all</button>
          </div>
          <div className="relative pl-5 pr-5 pb-5 space-y-4">
            <div className="absolute left-[26px] top-2 bottom-2 w-px bg-[var(--slate-200)]"></div>
            {recentActivities.map((activity, i) => (
              <div key={i} className="relative flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 relative z-10" style={{ backgroundColor: activity.color }}></div>
                <div>
                  <p className="text-[13px] text-[var(--slate-900)]">{activity.text}</p>
                  <p className="text-xs text-[var(--slate-400)]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
