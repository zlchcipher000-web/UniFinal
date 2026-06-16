import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Users, Wallet, Banknote, Shield, X } from 'lucide-react';
import { useState } from 'react';

const courses = ['BSIT', 'BS Computer Science', 'BS Biology', 'BSEd Mathematics', 'BSEd Physics', 'BS Accountancy', 'BS Psychology'];
const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
const allSubjects = ['Mathematics', 'English', 'Science', 'Programming', 'Physics', 'Calculus', 'Algebra', 'Biology', 'Chemistry', 'Accounting', 'Data Structures', 'Web Development'];

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState(['Programming', 'Data Structures', 'Web Development']);
  const [subjectInput, setSubjectInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const addSubject = (s: string) => {
    if (!subjects.includes(s)) setSubjects([...subjects, s]);
    setSubjectInput('');
  };
  const removeSubject = (s: string) => setSubjects(subjects.filter(x => x !== s));

  const filteredSubjects = subjectInput ? allSubjects.filter(s => s.toLowerCase().includes(subjectInput.toLowerCase()) && !subjects.includes(s)) : [];

  return (
    <div className="page-container">
      <button onClick={() => navigate('/student-management')} className="flex items-center gap-1 text-sm text-[var(--primary-blue)] hover:underline mb-2">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </button>
      <div className="text-xs text-[var(--slate-500)] mb-6">Student Management → Add New Student</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 card card-padding">
          <h2 className="text-base font-semibold text-[var(--slate-900)] mb-6">Student Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Student ID <span className="text-[var(--red)]">*</span></label>
              <input type="text" defaultValue="20712345" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Full Name <span className="text-[var(--red)]">*</span></label>
              <input type="text" defaultValue="John Michael Dela Cruz" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Email <span className="text-[var(--red)]">*</span></label>
              <input type="email" defaultValue="john.delacruz@bsu.edu.ph" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Phone Number <span className="text-[var(--red)]">*</span></label>
              <input type="tel" defaultValue="0918 765 4321" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Course <span className="text-[var(--red)]">*</span></label>
              <select className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]">
                {courses.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Year Level <span className="text-[var(--red)]">*</span></label>
              <select className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]">
                {yearLevels.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Subjects You Can Tutor <span className="text-[var(--red)]">*</span></label>
            <div className="border border-[var(--slate-200)] rounded-md p-2 focus-within:border-[var(--primary-blue)] focus-within:ring-2 focus-within:ring-[var(--primary-blue)]/10">
              <div className="flex flex-wrap gap-2 mb-2">
                {subjects.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--sky-blue)] text-[var(--primary-blue)] text-xs rounded-md">
                    {s} <button onClick={() => removeSubject(s)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <input type="text" value={subjectInput} onChange={e => setSubjectInput(e.target.value)} placeholder="Type to search subjects..." className="w-full text-sm outline-none" />
            </div>
            {filteredSubjects.length > 0 && (
              <div className="border border-[var(--slate-200)] rounded-md mt-1 bg-white shadow-lg max-h-32 overflow-y-auto">
                {filteredSubjects.map(s => (
                  <button key={s} onClick={() => addSubject(s)} className="block w-full text-left px-3 py-2 text-sm hover:bg-[var(--slate-50)]">{s}</button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Hourly Rate (₱) <span className="text-[var(--red)]">*</span></label>
            <input type="number" defaultValue="250" min="50" step="10" className="w-full sm:w-48 px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Password <span className="text-[var(--red)]">*</span></label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} defaultValue="password123" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--slate-500)]">{showPw ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Confirm Password <span className="text-[var(--red)]">*</span></label>
            <div className="relative">
              <input type={showConfirmPw ? 'text' : 'password'} defaultValue="password123" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" />
              <button onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--slate-500)]">{showConfirmPw ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <button onClick={() => navigate('/student-management')} className="px-6 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">Cancel</button>
            <button className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]">Create Student Account</button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="card card-padding">
          <div className="text-center mb-6">
            <GraduationCap className="w-8 h-8 text-[var(--primary-blue)] mx-auto mb-2" />
            <h2 className="text-base font-semibold text-[var(--slate-900)]">About Student Accounts</h2>
          </div>
          <div className="space-y-5">
            {[
              { icon: Users, title: 'Students can tutor and earn', desc: 'Students will be able to accept tutoring requests and earn based on completed sessions.' },
              { icon: Wallet, title: 'Earnings for tuition', desc: 'Students can use their earnings for tuition and other educational expenses.' },
              { icon: Banknote, title: 'Payouts', desc: 'Students can request payouts once they reach the minimum payout amount set by the university.' },
              { icon: Shield, title: 'Account is managed by university', desc: 'All student accounts are created and managed by the university for security and compliance.' },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-3 ${i > 0 ? 'pt-5 border-t border-[var(--slate-100)]' : ''}`}>
                <item.icon className="w-5 h-5 text-[var(--primary-blue)] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[var(--slate-900)]">{item.title}</h3>
                  <p className="text-sm text-[var(--slate-600)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
