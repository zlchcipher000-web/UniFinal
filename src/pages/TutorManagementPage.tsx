import { useState } from 'react';
import { Search, Download, Plus, Filter, Eye, Pencil, MoreVertical } from 'lucide-react';
import { tutors } from '@/data/mockData';
import { useDebounce } from '@/hooks/useDebounce';
import { formatPeso } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

export default function TutorManagementPage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [status, setStatus] = useState('All');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = tutors.filter(t => {
    const matchSearch = !debouncedSearch || t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.studentId.includes(debouncedSearch);
    const matchSubject = subject === 'All' || t.subjects.toLowerCase().includes(subject.toLowerCase());
    const matchStatus = status === 'All' || t.status === status;
    return matchSearch && matchSubject && matchStatus;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white"><Plus className="w-4 h-4" /> Add New Tutor</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" /><input type="text" placeholder="Search tutor by name, ID, or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm w-56 focus:outline-none focus:border-[var(--primary-blue)]" /></div>
        <select value={subject} onChange={e => setSubject(e.target.value)} className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm"><option>All</option><option>Mathematics</option><option>Programming</option><option>Science</option><option>Physics</option></select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm"><option>All</option><option>Active</option><option>Suspended</option><option>Pending</option></select>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] bg-white"><Filter className="w-4 h-4" /> Filter</button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-[var(--slate-100)]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Student</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Student ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Course</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Year Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Subjects</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Hourly Rate</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[var(--slate-100)]">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[var(--slate-50)]">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar name={t.name} color={t.avatarColor} size="sm" /> <span className="text-[13px] font-medium">{t.name}</span></div></td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{t.studentId}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{t.course}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{t.yearLevel}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{t.subjects}</td>
                  <td className="px-4 py-3 text-[13px] text-right font-medium">{formatPeso(t.hourlyRate)}/hr</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><Eye className="w-4 h-4 text-[var(--slate-400)]" /></button><button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><Pencil className="w-4 h-4 text-[var(--slate-400)]" /></button><button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md"><MoreVertical className="w-4 h-4 text-[var(--slate-400)]" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[var(--slate-100)] flex items-center justify-between">
          <span className="text-xs text-[var(--slate-500)]">Showing 1 to {filtered.length} of 42 tutors</span>
          <div className="flex items-center gap-1">{[1,2,3,4,5,'...',6].map((p,i)=><button key={i} className={`w-8 h-8 rounded-md text-xs ${p===1?'bg-[var(--primary-blue)] text-white':'text-[var(--slate-700)] hover:bg-[var(--slate-100)]'}`}>{p}</button>)}</div>
        </div>
      </div>
    </div>
  );
}
