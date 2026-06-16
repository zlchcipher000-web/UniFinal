import { Calendar, Bell, Settings } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  subtitle?: string;
}

export default function TopHeader({ title, subtitle }: TopHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[var(--slate-200)] flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-semibold text-[var(--slate-900)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--slate-500)]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-[var(--slate-500)]">
          <Calendar className="w-4 h-4" />
          <span>June 2, 2026</span>
        </div>
        <button className="relative p-2 hover:bg-[var(--slate-100)] rounded-md transition-colors">
          <Bell className="w-5 h-5 text-[var(--slate-500)]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--red)] rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-[var(--slate-100)] rounded-md transition-colors">
          <Settings className="w-5 h-5 text-[var(--slate-500)]" />
        </button>
      </div>
    </header>
  );
}
