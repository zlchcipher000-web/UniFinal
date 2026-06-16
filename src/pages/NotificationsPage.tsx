import { useState } from 'react';
import { Info, CheckCircle, Calendar, X } from 'lucide-react';
import { notifications as initialNotifications } from '@/data/mockData';

const typeConfig: Record<string, { icon: typeof Info; color: string; bg: string; border: string }> = {
  system: { icon: Info, color: 'text-[var(--primary-blue)]', bg: 'bg-[var(--sky-blue)]', border: 'border-l-[var(--primary-blue)]' },
  payment: { icon: CheckCircle, color: 'text-[var(--mint-green)]', bg: 'bg-[var(--mint-light)]', border: 'border-l-[var(--mint-green)]' },
  session: { icon: Calendar, color: 'text-[var(--amber)]', bg: 'bg-[var(--amber-light)]', border: 'border-l-[var(--amber)]' },
};

const tabs = ['All', 'Unread', 'System', 'Payments', 'Sessions'];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('All');

  const filtered = notifs.filter(n => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'System') return n.type === 'system';
    if (activeTab === 'Payments') return n.type === 'payment';
    if (activeTab === 'Sessions') return n.type === 'session';
    return true;
  });

  const toggleRead = (id: string) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const dismiss = (id: string) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-5">
        <div></div>
        <button onClick={markAllRead} className="text-sm text-[var(--primary-blue)] hover:underline flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Mark All as Read</button>
      </div>

      <div className="flex items-center gap-0 border-b border-[var(--slate-200)] mb-5">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'text-[var(--primary-blue)] border-[var(--primary-blue)]' : 'text-[var(--slate-500)] border-transparent hover:text-[var(--slate-700)]'}`}>
            {tab}{tab === 'All' && <span className="ml-1.5 text-[var(--slate-400)]">({notifs.length})</span>}{tab === 'Unread' && <span className="ml-1.5 text-[var(--red)]">({notifs.filter(n=>!n.read).length})</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(n => {
          const cfg = typeConfig[n.type] || typeConfig.system;
          const Icon = cfg.icon;
          return (
            <div key={n.id} className={`card flex items-start gap-4 p-4 border-l-[3px] ${cfg.border} ${!n.read ? 'bg-white' : 'bg-[var(--slate-50)]'}`}>
              <div className={`w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0`}><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-[13px] font-semibold ${!n.read ? 'text-[var(--slate-900)]' : 'text-[var(--slate-600)]'}`}>{n.title}</h3>
                <p className="text-xs text-[var(--slate-500)] mt-0.5 line-clamp-2">{n.description}</p>
                <span className="text-xs text-[var(--slate-400)] mt-1">{n.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleRead(n.id)} className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!n.read ? 'border-[var(--primary-blue)] bg-[var(--primary-blue)]' : 'border-[var(--slate-200)]'}`}>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
                <button onClick={() => dismiss(n.id)} className="p-1 hover:bg-[var(--slate-100)] rounded transition-colors"><X className="w-3.5 h-3.5 text-[var(--slate-400)]" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
