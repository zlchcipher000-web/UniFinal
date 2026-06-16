import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit3, Send, FileText } from 'lucide-react';
import { students, tuitionRecords } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function StudentTuitionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id) || students[0];
  const tuition = tuitionRecords.find(t => t.studentId === student.studentId) || tuitionRecords[0];

  const donutData = [
    { name: 'Paid', value: tuition.totalPaid, fill: '#2563EB' },
    { name: 'Balance', value: tuition.balance, fill: '#E2E8F0' },
  ];

  return (
    <div className="page-container space-y-5">
      <button onClick={() => navigate('/tuition-monitoring?tab=balances')} className="flex items-center gap-1 text-sm text-[var(--primary-blue)] hover:underline"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="text-xs text-[var(--slate-500)] mb-4">Tuition Monitoring → Student Details</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Profile */}
          <div className="card card-padding text-center">
            <Avatar name={student.name} color={student.avatarColor} size="xl" className="mx-auto mb-3" />
            <h2 className="text-xl font-bold">{student.name}</h2>
            <div className="text-xs text-[var(--slate-500)] mt-1">Student ID: {student.studentId}</div>
            <div className="text-xs text-[var(--slate-500)]">{student.course}</div>
            <div className="text-xs text-[var(--slate-500)]">{student.yearLevel}</div>
            <button onClick={() => navigate(`/student-management/${student.id}`)} className="text-sm text-[var(--primary-blue)] hover:underline mt-3">View Student Profile</button>
          </div>

          {/* Tuition Overview */}
          <div className="card card-padding">
            <h3 className="text-sm font-semibold mb-3">Tuition Overview</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-[var(--slate-50)] rounded-md p-2.5"><div className="text-[10px] text-[var(--slate-500)] uppercase">Total Tuition Due</div><div className="text-sm font-bold text-[var(--slate-900)]">{formatPeso(tuition.totalDue)}</div></div>
              <div className="bg-[var(--mint-light)] rounded-md p-2.5"><div className="text-[10px] text-[var(--slate-500)] uppercase">Total Paid</div><div className="text-sm font-bold text-[var(--mint-green)]">{formatPeso(tuition.totalPaid)}</div></div>
              <div className="bg-[var(--amber-light)] rounded-md p-2.5"><div className="text-[10px] text-[var(--slate-500)] uppercase">Balance</div><div className="text-sm font-bold text-[var(--amber)]">{formatPeso(tuition.balance)}</div></div>
              <div className="bg-[var(--slate-50)] rounded-md p-2.5"><div className="text-[10px] text-[var(--slate-500)] uppercase">Status</div><div><StatusBadge status={tuition.status === 'Partial' ? 'Partial Payment' : tuition.status} /></div></div>
            </div>
            <div className="space-y-1.5 text-xs text-[var(--slate-500)]">
              <div className="flex justify-between"><span>Academic Year</span><span className="text-[var(--slate-900)]">{tuition.academicYear}</span></div>
              <div className="flex justify-between"><span>Payment Plan</span><span className="text-[var(--slate-900)]">{tuition.paymentPlan}</span></div>
              <div className="flex justify-between"><span>Due Date</span><span className="text-[var(--slate-900)]">{tuition.dueDate}</span></div>
              <div className="flex justify-between"><span>Collection Rate</span><span className="text-[var(--slate-900)] font-medium">{tuition.collectionRate}%</span></div>
            </div>
            <div className="mt-2 h-1.5 bg-[var(--slate-100)] rounded-full"><div className="h-full bg-[var(--primary-blue)] rounded-full" style={{width:`${tuition.collectionRate}%`}}></div></div>
          </div>

          {/* Payment Progress Donut */}
          <div className="card card-padding text-center">
            <h3 className="text-sm font-semibold mb-3">Payment Progress</h3>
            <div className="h-[180px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}>{donutData.map((e,i)=><Cell key={i} fill={e.fill} />)}</Pie></PieChart></ResponsiveContainer></div>
            <div className="-mt-4 mb-2"><div className="text-2xl font-bold text-[var(--primary-blue)]">{tuition.collectionRate}%</div><div className="text-xs text-[var(--slate-500)]">Paid</div></div>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--primary-blue)]"></span>Paid {formatPeso(tuition.totalPaid)}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--slate-200)]"></span>Balance {formatPeso(tuition.balance)}</span>
            </div>
            <div className="text-xs text-[var(--slate-500)] mt-2">Total Due: {formatPeso(tuition.totalDue)}</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Tuition Breakdown */}
          <div className="card overflow-hidden">
            <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Tuition Breakdown</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-[var(--slate-50)]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Description</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase">Amount</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase">Paid</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase">Balance</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Due Date</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--slate-100)]">
                  {tuition.fees.map((fee, i) => (
                    <tr key={i} className="hover:bg-[var(--slate-50)]">
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-900)]">{fee.description}</td>
                      <td className="px-4 py-2.5 text-[13px] text-right">{formatPeso(fee.amount)}</td>
                      <td className="px-4 py-2.5 text-[13px] text-right text-[var(--mint-green)]">{formatPeso(fee.paid)}</td>
                      <td className="px-4 py-2.5 text-[13px] text-right">{formatPeso(fee.balance)}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-500)]">{fee.dueDate}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={fee.status} /></td>
                    </tr>
                  ))}
                  <tr className="bg-[var(--slate-50)] font-semibold">
                    <td className="px-4 py-2.5 text-[13px]">TOTAL</td>
                    <td className="px-4 py-2.5 text-[13px] text-right">{formatPeso(tuition.fees.reduce((a,f)=>a+f.amount,0))}</td>
                    <td className="px-4 py-2.5 text-[13px] text-right text-[var(--mint-green)]">{formatPeso(tuition.totalPaid)}</td>
                    <td className="px-4 py-2.5 text-[13px] text-right">{formatPeso(tuition.fees.reduce((a,f)=>a+f.balance,0))}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="card overflow-hidden">
            <div className="card-padding border-b border-[var(--slate-100)]"><h2 className="text-base font-semibold">Recent Payments</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-[var(--slate-50)]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Date</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">OR/Reference No.</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Description</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase">Amount</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase">Payment Method</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--slate-100)]">
                  {tuition.recentPayments.map((p, i) => (
                    <tr key={i} className="hover:bg-[var(--slate-50)]">
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-700)]">{p.date}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-700)]">{p.orNumber}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-700)]">{p.description}</td>
                      <td className="px-4 py-2.5 text-[13px] text-right font-medium">{formatPeso(p.amount)}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[var(--slate-700)]">{p.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card card-padding">
            <h2 className="text-base font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]"><Plus className="w-4 h-4" /> Record Payment</button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--slate-200)] bg-white text-[var(--slate-700)] rounded-md text-sm hover:bg-[var(--slate-50)]"><Edit3 className="w-4 h-4" /> Adjust Balance</button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--slate-200)] bg-white text-[var(--slate-700)] rounded-md text-sm hover:bg-[var(--slate-50)]"><Send className="w-4 h-4" /> Send Reminder</button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--slate-200)] bg-white text-[var(--slate-700)] rounded-md text-sm hover:bg-[var(--slate-50)]"><FileText className="w-4 h-4" /> View Statement</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
