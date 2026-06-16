import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Plus, Filter, Eye, Pencil, MoreVertical } from 'lucide-react';
import { students } from '@/data/mockData';
import { useDebounce } from '@/hooks/useDebounce';
import { formatPeso } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

export default function StudentManagementPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('All');
  const [year, setYear] = useState('All');
  const debouncedSearch = useDebounce(search, 300);

  const courses = ['All', ...Array.from(new Set(students.map(s => s.course)))];
  const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  const filtered = students.filter(s => {
    const matchSearch = !debouncedSearch || s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || s.studentId.includes(debouncedSearch) || s.course.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchCourse = course === 'All' || s.course === course;
    const matchYear = year === 'All' || s.yearLevel === year;
    return matchSearch && matchCourse && matchYear;
  });

  return (
    <div className="page-container">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] transition-colors bg-white">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => navigate('/student-management/new')} className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)] transition-colors">
            <Plus className="w-4 h-4" /> Add New Student
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {['Students List', 'Add New Student', 'Payout Requests'].map((tab) => {
          const isActive = tab === 'Students List';
          const tabRoute = tab === 'Students List' ? '/student-management' : tab === 'Add New Student' ? '/student-management/new' : '/student-management/payouts';
          return (
            <button key={tab} onClick={() => navigate(tabRoute)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${isActive ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)] hover:border-[var(--slate-200)]'}`}>
              {tab}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" />
          <input type="text" placeholder="Search by name, student ID, course, or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm w-64 focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/10" />
        </div>
        <select value={course} onChange={e => setCourse(e.target.value)} className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] focus:outline-none focus:border-[var(--primary-blue)]">
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={year} onChange={e => setYear(e.target.value)} className="px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] focus:outline-none focus:border-[var(--primary-blue)]">
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--slate-100)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Student ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Year Level</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Total Earnings</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Available Balance</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Total Payouts</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--slate-700)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--slate-100)]">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-[var(--slate-50)] transition-colors">
                  <td className="px-4 py-3">
                    <button onClick={() => navigate(`/student-management/${student.id}`)} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                      <Avatar name={student.name} color={student.avatarColor} size="sm" />
                      <span className="text-[13px] font-medium text-[var(--slate-900)]">{student.name}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{student.studentId}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{student.course}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{student.yearLevel}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-900)] text-right font-medium">{formatPeso(student.totalEarnings)}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-900)] text-right font-medium">{formatPeso(student.availableBalance)}</td>
                  <td className="px-4 py-3 text-[13px] text-[var(--slate-900)] text-right font-medium">{formatPeso(student.totalPayouts)}</td>
                  <td className="px-4 py-3"><StatusBadge status={student.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => navigate(`/student-management/${student.id}`)} className="p-1.5 hover:bg-[var(--slate-100)] rounded-md transition-colors"><Eye className="w-4 h-4 text-[var(--slate-400)]" /></button>
                      <button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md transition-colors"><Pencil className="w-4 h-4 text-[var(--slate-400)]" /></button>
                      <button className="p-1.5 hover:bg-[var(--slate-100)] rounded-md transition-colors"><MoreVertical className="w-4 h-4 text-[var(--slate-400)]" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[var(--slate-100)] flex items-center justify-between">
          <span className="text-xs text-[var(--slate-500)]">Showing 1 to {filtered.length} of 42 students</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, '...', 6].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-md text-xs font-medium flex items-center justify-center ${p === 1 ? 'bg-[var(--primary-blue)] text-white' : 'text-[var(--slate-700)] hover:bg-[var(--slate-100)]'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
