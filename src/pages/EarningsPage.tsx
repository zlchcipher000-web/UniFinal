import { Wallet, Banknote, Clock, ArrowLeftRight } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { formatPeso } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { earningsTrendData } from '@/data/mockData';
import Avatar from '@/components/Avatar';

const topEarners = [
  { name: 'Maria Santos', sessions: 56, earnings: 18000, color: '#2563EB' },
  { name: 'Juan Cruz', sessions: 42, earnings: 13500, color: '#10B981' },
  { name: 'Pedro Reyes', sessions: 30, earnings: 8500, color: '#F59E0B' },
  { name: 'Lisa Salvador', sessions: 28, earnings: 7200, color: '#7C3AED' },
  { name: 'Mark Tuason', sessions: 22, earnings: 6500, color: '#EC4899' },
];

export default function EarningsPage() {
  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div></div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-[var(--slate-200)] rounded-md text-sm"><option>This Month</option></select>
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Wallet} value={284500} label="Total Earnings (This Month)" trend={12} isCurrency />
        <StatCard icon={Banknote} value={256000} label="Total Payouts" trend={8} isCurrency iconBg="bg-[var(--mint-light)]" iconColor="text-[var(--mint-green)]" />
        <StatCard icon={Clock} value={28500} label="Pending Payouts" trend={-5} isCurrency iconBg="bg-[var(--amber-light)]" iconColor="text-[var(--amber)]" />
        <StatCard icon={ArrowLeftRight} value={642} label="Total Transactions" trend={15} iconBg="bg-[var(--purple-light)]" iconColor="text-[var(--purple-accent)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card">
          <div className="card-padding flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--slate-900)]">Earnings Overview</h2>
            <select className="text-xs border border-[var(--slate-200)] rounded-md px-2 py-1"><option>By Week</option></select>
          </div>
          <div className="h-[280px] px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTrendData}>
                <defs><linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.15}/><stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} formatter={(value: number) => formatPeso(value)} />
                <Area type="monotone" dataKey="earnings" stroke="var(--primary-blue)" strokeWidth={2} fill="url(#earningsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold text-[var(--slate-900)]">Top Earners</h2></div>
          <div className="divide-y divide-[var(--slate-100)]">
            {topEarners.map((t, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <span className="text-sm font-bold text-[var(--slate-500)] w-4">{i + 1}</span>
                <Avatar name={t.name} color={t.color} size="sm" />
                <div className="flex-1"><div className="text-[13px] font-semibold text-[var(--slate-900)]">{t.name}</div><div className="text-xs text-[var(--slate-500)]">{t.sessions} sessions</div></div>
                <div className="text-[13px] font-semibold">{formatPeso(t.earnings)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
