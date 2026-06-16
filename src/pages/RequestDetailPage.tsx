import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Mail, ChevronRight } from 'lucide-react';
import { requests } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

export default function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const req = requests.find(r => r.id === id) || requests[0];

  return (
    <div className="page-container">
      <button onClick={() => navigate('/requests')} className="flex items-center gap-1 text-sm text-[var(--primary-blue)] hover:underline mb-2"><ArrowLeft className="w-4 h-4" /> Back to Requests</button>
      <div className="text-xs text-[var(--slate-500)] mb-6">Requests → Request Detail</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="card card-padding">
            <div className="flex items-center gap-3 mb-5">
              <Avatar name={req.studentName} color={req.avatarColor} size="xl" />
              <div><h2 className="text-xl font-bold text-[var(--slate-900)]">{req.studentName}</h2><span className="text-sm text-[var(--slate-500)]">{req.gradeLevel}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Student Name</span><div className="text-sm text-[var(--slate-900)]">{req.studentName}</div></div>
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Grade Level</span><div className="text-sm text-[var(--slate-900)]">{req.gradeLevel}</div></div>
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Subject</span><div className="text-sm text-[var(--slate-900)]">{req.subject}</div></div>
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Preferred Schedule</span><div className="text-sm text-[var(--slate-900)]">{req.preferredSchedule}</div></div>
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Session Type</span><div className="text-sm text-[var(--slate-900)]">{req.sessionType}</div></div>
              <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Parent Contact</span><div className="text-sm text-[var(--slate-900)]">{req.parentContact}</div></div>
            </div>
            <div><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Message</span>
              <div className="bg-[var(--slate-50)] rounded-md p-3 mt-1"><p className="text-sm text-[var(--slate-600)]">{req.message}</p></div>
            </div>
            {req.tutorName && (
              <div className="mt-4"><span className="text-xs text-[var(--slate-500)] uppercase tracking-wider">Requested Tutor</span>
                <div className="flex items-center gap-3 mt-2 p-3 bg-[var(--slate-50)] rounded-md"><Avatar name={req.tutorName} size="md" />
                  <div><div className="text-sm font-medium">{req.tutorName}</div><div className="text-xs text-[var(--slate-500)]">{req.tutorCourse} — {req.tutorYear}</div><div className="text-xs text-[var(--slate-500)]">{req.tutorRate}</div></div>
                </div>
              </div>
            )}
          </div>
          <div className="card card-padding">
            <h3 className="text-sm font-semibold text-[var(--slate-900)] mb-3">Request History</h3>
            <div className="relative pl-4">
              <div className="absolute left-[7px] top-2 bottom-0 w-px bg-[var(--slate-200)]"></div>
              <div className="relative flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-[var(--primary-blue)] mt-1 flex-shrink-0"></div><div><div className="text-sm text-[var(--slate-900)]">Requested</div><div className="text-xs text-[var(--slate-500)]">{req.requestDate}</div></div></div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="card card-padding space-y-4">
            <div><StatusBadge status={req.status === 'Pending' ? 'Pending Review' : req.status} /></div>
            {req.status === 'Pending' && (
              <>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]"><Check className="w-4 h-4" /> Approve Request</button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--red)] text-white rounded-md text-sm font-medium hover:opacity-90"><X className="w-4 h-4" /> Decline Request</button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--slate-200)] bg-white text-[var(--slate-700)] rounded-md text-sm hover:bg-[var(--slate-100)]"><Mail className="w-4 h-4" /> Message Parent</button>
              </>
            )}
            <div className="pt-2 border-t border-[var(--slate-100)]">
              <div className="text-xs text-[var(--slate-500)] mb-2">Requested: {req.requestDate}</div>
              <button className="text-sm text-[var(--primary-blue)] hover:underline flex items-center gap-1">View Profile <ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
