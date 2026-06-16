import { useState } from 'react';
import { adminUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

const settingsTabs = [
  'Account Settings',
  'Profile Settings',
  'Users and Roles',
  'Notification Settings',
  'Security',
  'System Preferences',
  'Audit Logs',
];

const notificationSettings = [
  { label: 'Email notifications for new requests', default: true },
  { label: 'Email notifications for payments', default: true },
  { label: 'Email notifications for session completions', default: true },
  { label: 'Email daily summary report', default: false },
  { label: 'In-app notification sounds', default: true },
  { label: 'Browser push notifications', default: false },
];

const Toggle = ({ defaultOn }: { defaultOn: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-[var(--primary-blue)]' : 'bg-[var(--slate-200)]'}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account Settings');

  return (
    <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Nav */}
        <div className="lg:w-[200px] flex-shrink-0">
          <div className="space-y-0.5">
            {settingsTabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn('w-full text-left px-4 py-2.5 rounded-md text-sm transition-colors', activeTab === tab ? 'bg-[var(--slate-100)] text-[var(--slate-900)] font-semibold' : 'text-[var(--slate-600)] hover:bg-[var(--slate-50)]')}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'Account Settings' && (
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Full Name <span className="text-[var(--red)]">*</span></label><input type="text" defaultValue={adminUser.name} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Email <span className="text-[var(--red)]">*</span></label><input type="email" defaultValue={adminUser.email} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Role</label><select defaultValue={adminUser.role} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm"><option>Administrator</option><option>Moderator</option><option>Viewer</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Contact Number</label><input type="tel" defaultValue={adminUser.contact} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Bio/About</label><textarea defaultValue={adminUser.bio} rows={4} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm focus:outline-none focus:border-[var(--primary-blue)]" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Department</label><input type="text" defaultValue={adminUser.department} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Employee ID</label><input type="text" defaultValue={adminUser.employeeId} className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm" /></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]">Save Changes</button>
                <button className="px-6 py-2.5 border border-[var(--slate-200)] rounded-md text-sm text-[var(--slate-700)] hover:bg-[var(--slate-50)] bg-white">Reset</button>
              </div>
            </div>
          )}

          {activeTab === 'Notification Settings' && (
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {notificationSettings.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--slate-100)] last:border-0">
                    <span className="text-sm text-[var(--slate-700)]">{s.label}</span>
                    <Toggle defaultOn={s.default} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="card card-padding space-y-6">
              <h2 className="text-base font-semibold">Security Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Current Password</label><input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm" /></div>
                <div></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">New Password</label><input type="password" placeholder="Enter new password" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Confirm New Password</label><input type="password" placeholder="Confirm new password" className="w-full px-3 py-2.5 border border-[var(--slate-200)] rounded-md text-sm" /></div>
              </div>
              <div className="border-t border-[var(--slate-100)] pt-4">
                <div className="flex items-center justify-between">
                  <div><h3 className="text-sm font-semibold">Two-factor authentication</h3><p className="text-xs text-[var(--slate-500)]">Add an extra layer of security</p></div>
                  <div className="flex items-center gap-3"><span className="text-xs text-[var(--slate-500)]">Off</span><Toggle defaultOn={false} /></div>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)]">Save Changes</button>
            </div>
          )}

          {activeTab === 'System Preferences' && (
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-6">System Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Academic Year</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>2025 - 2026</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Semester</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>1st Semester</option><option>2nd Semester</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Currency</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>PHP (₱)</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Default Payment Method</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>GCash</option><option>Bank Transfer</option><option>Cash</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Auto-verify payments below</label><input type="text" defaultValue="₱5,000" className="w-full px-3 py-2.5 border rounded-md text-sm" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Session duration default</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select></div>
              </div>
              <button className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)] mt-6">Save Changes</button>
            </div>
          )}

          {activeTab === 'Audit Logs' && (
            <div className="card overflow-hidden">
              <div className="card-padding border-b border-[var(--slate-100)] flex items-center justify-between">
                <h2 className="text-base font-semibold">Audit Logs</h2>
                <div className="flex items-center gap-2"><select className="text-xs border rounded-md px-2 py-1"><option>Last 30 days</option></select></div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="bg-[var(--slate-50)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Timestamp</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Action</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Details</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">IP Address</th>
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--slate-100)]">
                    {[
                      { time: 'Jun 2, 2026 3:45 PM', user: 'Maria Elena Cruz', action: 'Updated settings', details: 'Changed notification preferences', ip: '192.168.1.1' },
                      { time: 'Jun 2, 2026 2:30 PM', user: 'Maria Elena Cruz', action: 'Verified payment', details: 'OR-2026-5567 — ₱4,000', ip: '192.168.1.1' },
                      { time: 'Jun 2, 2026 10:15 AM', user: 'Maria Elena Cruz', action: 'Approved request', details: 'Request #1234 — Ana Dela Cruz', ip: '192.168.1.1' },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-[var(--slate-50)]">
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{log.time}</td>
                        <td className="px-4 py-3 text-[13px] font-medium">{log.user}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{log.action}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{log.details}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-500)]">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Users and Roles' && (
            <div className="card overflow-hidden">
              <div className="card-padding border-b border-[var(--slate-100)] flex items-center justify-between">
                <h2 className="text-base font-semibold">Users and Roles</h2>
                <button className="px-3 py-1.5 bg-[var(--primary-blue)] text-white text-xs rounded-md hover:bg-[var(--primary-blue-hover)]">+ Add User</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="bg-[var(--slate-50)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Last Active</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase">Actions</th>
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--slate-100)]">
                    {[
                      { name: 'Maria Elena Cruz', email: 'admin@bsu.edu.ph', role: 'Administrator', status: 'Active', lastActive: 'Just now' },
                      { name: 'Juan Dela Cruz', email: 'moderator@bsu.edu.ph', role: 'Moderator', status: 'Active', lastActive: '2 hours ago' },
                      { name: 'Ana Santos', email: 'viewer@bsu.edu.ph', role: 'Viewer', status: 'Inactive', lastActive: '3 days ago' },
                    ].map((u, i) => (
                      <tr key={i} className="hover:bg-[var(--slate-50)]">
                        <td className="px-4 py-3 text-[13px] font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{u.email}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-700)]">{u.role}</td>
                        <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-[var(--mint-light)] text-[var(--mint-green)]' : 'bg-[var(--slate-100)] text-[var(--slate-500)]'}`}>{u.status}</span></td>
                        <td className="px-4 py-3 text-[13px] text-[var(--slate-500)]">{u.lastActive}</td>
                        <td className="px-4 py-3"><button className="text-xs text-[var(--primary-blue)] hover:underline">Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Profile Settings' && (
            <div className="card card-padding">
              <h2 className="text-base font-semibold mb-6">Profile Settings</h2>
              <div className="mb-6">
                <div className="w-24 h-24 rounded-full bg-[var(--slate-100)] flex items-center justify-center mx-auto mb-2"><span className="text-2xl font-bold text-[var(--primary-blue)]">MC</span></div>
                <button className="text-sm text-[var(--primary-blue)] hover:underline block mx-auto">Upload Photo</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Display Name</label><input type="text" defaultValue={adminUser.name} className="w-full px-3 py-2.5 border rounded-md text-sm" /></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Timezone</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>Asia/Manila</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Language</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>English</option><option>Filipino</option></select></div>
                <div><label className="block text-sm font-semibold text-[var(--slate-700)] mb-1.5">Date Format</label><select className="w-full px-3 py-2.5 border rounded-md text-sm"><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></div>
              </div>
              <button className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-blue-hover)] mt-6">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
