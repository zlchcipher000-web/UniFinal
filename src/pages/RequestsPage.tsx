import { useState } from 'react';
import { Search, Filter, Download, Check, X, Mail, ChevronRight } from 'lucide-react';
import { requests } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Assigned', 'Declined', 'All'];
  const filtered = activeTab === 'All' ? requests : requests.filter(r => {
    if (activeTab === 'Pending') return r.status === 'Pending';
    return r.status === activeTab;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" /><input type="text" placeholder="Search request..." className="pl-9 pr-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm w-56" /></div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Filter className="w-4 h-4" /> Filter</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Download className="w-4 h-4" /> Export</button>
      </div>

      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)]'}`}>
            {tab}{tab === 'Pending' && <span className="ml-1.5 px-1.5 py-0.5 bg-[var(--amber)] text-white text-[10px] rounded-full">20</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(req => (
          <div key={req.id} className="card overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={req.studentName} color={req.avatarColor} size="lg" />
                  <div>
                    <h3 className="text-base font-semibold text-[var(--slate-900)]">{req.studentName}</h3>
                    <span className="text-xs text-[var(--slate-500)]">{req.gradeLevel}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><span className="text-xs text-[var(--slate-500)]">Subject</span><div className="text-sm text-[var(--slate-900)]">{req.subject}</div></div>
                  <div><span className="text-xs text-[var(--slate-500)]">Preferred Schedule</span><div className="text-sm text-[var(--slate-900)]">{req.preferredSchedule}</div></div>
                  <div><span className="text-xs text-[var(--slate-500)]">Session Type</span><div className="text-sm text-[var(--slate-900)]">{req.sessionType}</div></div>
                  <div><span className="text-xs text-[var(--slate-500)]">Parent Contact</span><div className="text-sm text-[var(--slate-900)] flex items-center gap-1"><Mail className="w-3 h-3" />{req.parentContact}</div></div>
                </div>
                <div className="bg-[var(--slate-50)] rounded-md p-3"><p className="text-sm text-[var(--slate-600)]">{req.message}</p></div>
                {req.tutorName && (
                  <div className="mt-3 flex items-center gap-2"><span className="text-xs text-[var(--slate-500)]">Requested Tutor:</span>
                    <div className="flex items-center gap-2"><Avatar name={req.tutorName} size="sm" /> <span className="text-xs font-medium">{req.tutorName} — {req.tutorCourse}</span></div>
                  </div>
                )}
              </div>
              <div className="lg:w-[280px] border-t lg:border-t-0 lg:border-l border-[var(--slate-100)] p-5 bg-[var(--slate-50)]">
                <div className="mb-4"><StatusBadge status={req.status === 'Pending' ? 'Pending Review' : req.status} /></div>
                <div className="text-xs text-[var(--slate-500)] mb-4">Requested: {req.requestDate}</div>
                {req.status === 'Pending' && (
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]"><Check className="w-4 h-4" /> Approve Request</button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--red)] text-white rounded-md text-sm font-medium hover:opacity-90"><X className="w-4 h-4" /> Decline Request</button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] bg-white text-[var(--slate-700)] rounded-md text-sm hover:bg-[var(--slate-100)]"><Mail className="w-4 h-4" /> Message Parent</button>
                  </div>
                )}
                <button className="text-sm text-[var(--primary-blue)] hover:underline mt-3 flex items-center gap-1">View Profile <ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
