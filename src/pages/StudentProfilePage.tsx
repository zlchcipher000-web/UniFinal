import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Banknote, CheckCircle, Pencil } from 'lucide-react';
import { students } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';
import StatCard from '@/components/StatCard';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { studentEarningsTrend } from '@/data/mockData';

const earningsHistory = [
  { date: 'June 1, 2026', desc: 'Tutoring Sessions', sessions: 5, amount: 2000 },
  { date: 'May 25, 2026', desc: 'Tutoring Sessions', sessions: 4, amount: 1600 },
  { date: 'May 18, 2026', desc: 'Tutoring Sessions', sessions: 3, amount: 1200 },
  { date: 'May 11, 2026', desc: 'Tutoring Sessions', sessions: 4, amount: 1500 },
  { date: 'May 4, 2026', desc: 'Tutoring Sessions', sessions: 5, amount: 2000 },
];

const recentSessions = [
  { date: 'June 2, 2026', time: '2:00 PM', subject: 'Algebra Review', duration: '2h', status: 'Completed' },
  { date: 'June 1, 2026', time: '10:00 AM', subject: 'Calculus Help', duration: '1.5h', status: 'Completed' },
  { date: 'May 30, 2026', time: '3:00 PM', subject: 'Math Problem Solving', duration: '1h', status: 'Completed' },
  { date: 'May 28, 2026', time: '4:00 PM', subject: 'Algebra Basics', duration: '1.5h', status: 'Completed' },
  { date: 'May 26, 2026', time: '1:00 PM', subject: 'Exam Preparation', duration: '2h', status: 'Completed' },
];

export default function StudentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id) || students[0];

  return (
    <div className="page-container space-y-6">
      {/* Back */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => navigate('/student-management')} className="flex items-center gap-1 text-sm text-[var(--primary-blue)] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
      <div className="text-xs text-[var(--slate-500)] mb-4">Students List → Student Profile</div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Profile Card */}
          <div className="card card-padding text-center">
            <Avatar name={student.name} color={student.avatarColor} size="xl" className="mx-auto mb-3" />
            <h2 className="text-xl font-bold text-[var(--slate-900)]">{student.name}</h2>
            <div className="flex justify-center mt-2"><StatusBadge status={student.status} /></div>
            <div className="text-xs text-[var(--slate-500)] mt-2">Student ID: {student.studentId}</div>
            <div className="text-xs text-[var(--slate-500)]">{student.course}</div>
            <div className="text-xs text-[var(--slate-500)]">{student.yearLevel}</div>
            <div className="border-t border-[var(--slate-100)] mt-4 pt-4 space-y-2 text-left">
              <div><span className="text-xs text-[var(--slate-500)]">Email</span><div className="text-sm text-[var(--primary-blue)]">{student.email}</div></div>
              <div><span className="text-xs text-[var(--slate-500)]">Phone</span><div className="text-sm text-[var(--slate-900)]">{student.phone}</div></div>
              <div><span className="text-xs text-[var(--slate-500)]">Address</span><div className="text-sm text-[var(--slate-900)]">{student.address}</div></div>
              <div><span className="text-xs text-[var(--slate-500)]">Joined</span><div className="text-sm text-[var(--slate-900)]">{student.joined}</div></div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">
              <Pencil className="w-4 h-4" /> Edit Student
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Earnings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={Wallet} value={student.totalEarnings} label="All time" isCurrency />
            <StatCard icon={Banknote} value={student.availableBalance} label="Ready for payout" isCurrency iconBg="bg-[var(--mint-light)]" iconColor="text-[var(--mint-green)]" />
            <StatCard icon={CheckCircle} value={student.totalPayouts} label="All time" isCurrency iconBg="bg-[var(--purple-light)]" iconColor="text-[var(--purple-accent)]" />
          </div>

          {/* Pending Alert */}
          <div className="bg-[var(--amber-light)] rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-[var(--amber)]">Pending Request</div>
              <div className="text-sm font-semibold text-[var(--slate-900)]">₱2,000 <span className="text-xs font-normal text-[var(--slate-500)]">For review</span></div>
              <div className="text-xs text-[var(--slate-500)]">Available Balance: {formatPeso(student.availableBalance)}</div>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]">Request Payout</button>
          </div>

          {/* Earnings Chart + Payout Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 card">
              <div className="card-padding flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[var(--slate-900)]">Earnings Trend</h2>
                <select className="text-xs border border-[var(--slate-200)] rounded-md px-2 py-1 text-[var(--slate-700)]"><option>This Year</option></select>
              </div>
              <div className="h-[220px] px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentEarningsTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={{ stroke: 'var(--slate-200)' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="earnings" stroke="var(--primary-blue)" strokeWidth={2} dot={{ r: 4, fill: 'var(--primary-blue)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card card-padding">
              <h2 className="text-base font-semibold text-[var(--slate-900)] mb-4">Payout Information</h2>
              <div className="space-y-3">
                <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Payout Method</span><div className="text-sm text-[var(--slate-900)]">Bank Transfer (BPI)</div></div>
                <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Account Number</span><div className="text-sm text-[var(--slate-900)]">**** **** **** 1234</div></div>
                <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Account Name</span><div className="text-sm text-[var(--slate-900)]">{student.name}</div></div>
              </div>
              <button className="text-xs text-[var(--primary-blue)] hover:underline mt-4">Edit Payout Info</button>
            </div>
          </div>

          {/* Earnings History + Recent Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card">
              <div className="card-padding border-b border-[var(--slate-100)]">
                <h2 className="text-base font-semibold text-[var(--slate-900)]">Earnings History</h2>
              </div>
              <table className="w-full">
                <thead><tr className="bg-[var(--slate-50)]"><th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--slate-700)]">Date</th><th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--slate-700)]">Description</th><th className="text-center px-4 py-2.5 text-xs font-semibold text-[var(--slate-700)]">Sessions</th><th className="text-right px-4 py-2.5 text-xs font-semibold text-[var(--slate-700)]">Amount</th></tr></thead>
                <tbody className="divide-y divide-[var(--slate-100)]">
                  {earningsHistory.map((e, i) => (
                    <tr key={i} className="hover:bg-[var(--slate-50)]"><td className="px-4 py-2.5 text-xs text-[var(--slate-700)]">{e.date}</td><td className="px-4 py-2.5 text-xs text-[var(--slate-900)]">{e.desc}</td><td className="px-4 py-2.5 text-xs text-center text-[var(--slate-700)]">{e.sessions}</td><td className="px-4 py-2.5 text-xs text-right font-medium text-[var(--slate-900)]">{formatPeso(e.amount)}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="card-padding pt-2"><button className="text-xs text-[var(--primary-blue)] hover:underline">View All Earnings History</button></div>
            </div>
            <div className="card">
              <div className="card-padding flex items-center justify-between border-b border-[var(--slate-100)]">
                <h2 className="text-base font-semibold text-[var(--slate-900)]">Recent Sessions</h2>
                <button className="text-xs text-[var(--primary-blue)] hover:underline">View All</button>
              </div>
              <div className="divide-y divide-[var(--slate-100)]">
                {recentSessions.map((s, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[var(--slate-500)]">{s.date} {s.time}</div>
                      <div className="text-[13px] font-medium text-[var(--slate-900)]">{s.subject}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--slate-500)]">{s.duration}</span>
                      <StatusBadge status={s.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
