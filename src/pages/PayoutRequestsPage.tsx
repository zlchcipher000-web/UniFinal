import { useNavigate } from 'react-router-dom';
import { Download, Filter, Eye } from 'lucide-react';
import { useState } from 'react';
import { payoutRequests } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

export default function PayoutRequestsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('All');
  const filtered = status === 'All' ? payoutRequests : payoutRequests.filter(p => p.status === status);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {['Students List', 'Add New Student', 'Payout Requests'].map((tab) => {
          const tabRoute = tab === 'Students List' ? '/student-management' : tab === 'Add New Student' ? '/student-management/new' : '/student-management/payouts';
          const isActive = tab === 'Payout Requests';
          return (
            <button key={tab} onClick={() => navigate(tabRoute)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${isActive ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)]'}`}>{tab}</button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm">
          <option>All</option><option>Pending</option><option>Approved</option><option>Paid</option>
        </select>
        <select className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm"><option>All Time</option></select>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Filter className="w-4 h-4" /> Filter</button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-[var(--slate-100)]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Student</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Request Date</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Payout Method</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Account Details</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[var(--slate-100)]">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-[var(--slate-50)]">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar name={req.student} size="sm" /> <span className="text-[13px] font-medium">{req.student}</span></div></td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{req.date}</td>
                  <td className="px-4 py-3 text-[13px] text-right font-medium">{formatPeso(req.amount)}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{req.method}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{req.accountDetail}</td>
                  <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                  <td className="px-4 py-3">
                    {req.status === 'Pending' && <button className="px-3 py-1.5 bg-[var(--primary-blue)] text-white text-xs rounded-md hover:bg-[var(--primary-blue-hover)]">Review</button>}
                    {req.status === 'Paid' && <button className="text-xs text-[var(--primary-blue)] hover:underline">View Receipt</button>}
                    {req.status === 'Approved' && <Eye className="w-4 h-4 text-[var(--slate-400)]" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[var(--slate-100)] flex items-center justify-between">
          <span className="text-xs text-[var(--slate-500)]">Showing 1 to {filtered.length} of 24 requests</span>
          <div className="flex items-center gap-1">{[1,2,3,4].map(p => <button key={p} className={`w-8 h-8 rounded-md text-xs ${p===1?'bg-[var(--primary-blue)] text-white':'text-[var(--slate-700)] hover:bg-[var(--slate-100)]'}`}>{p}</button>)}</div>
        </div>
      </div>
    </div>
  );
}
