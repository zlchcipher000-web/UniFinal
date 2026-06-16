import { Pencil, Shield } from 'lucide-react';
import { universityProfile } from '@/data/mockData';
import { formatPeso } from '@/lib/utils';

const details = [
  { label: 'University Email', value: universityProfile.email },
  { label: 'Contact Number', value: universityProfile.contact },
  { label: 'Address', value: universityProfile.address },
  { label: 'Date Joined', value: universityProfile.dateJoined },
  { label: 'Total Tutors', value: universityProfile.totalTutors.toString() },
  { label: 'Total Earnings Generated', value: formatPeso(universityProfile.totalEarnings) },
];

const miniStats = [
  { value: '542', label: 'Total Registered Tutors' },
  { value: '116', label: 'Active Sessions This Month' },
  { value: formatPeso(284500), label: 'Total Earnings This Month' },
  { value: '23', label: 'Pending Requests' },
];

export default function UniversityProfilePage() {
  return (
    <div className="page-container space-y-6">
      <div className="card rounded-xl overflow-hidden shadow-md">
        <div className="h-1 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--mint-green)]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="text-center space-y-4">
            <div className="w-[120px] h-[120px] rounded-full bg-[var(--navy)] flex items-center justify-center mx-auto">
              <Shield className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--slate-900)]">{universityProfile.name}</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--mint-light)] text-[var(--mint-green)] text-xs font-medium rounded-full">
              <Shield className="w-3 h-3" /> Verified University
            </span>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)] mt-4">
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {details.map((d, i) => (
                <div key={i} className={`${i < details.length - 1 ? 'pb-4 border-b border-[var(--slate-100)]' : ''}`}>
                  <span className="text-xs text-[var(--slate-500)] uppercase tracking-wider font-medium">{d.label}</span>
                  <div className="text-sm font-medium text-[var(--slate-900)] mt-1">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {miniStats.map((s, i) => (
          <div key={i} className="card card-padding text-center">
            <div className="text-xl font-bold text-[var(--slate-900)]">{s.value}</div>
            <div className="text-xs text-[var(--slate-500)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
