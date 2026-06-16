import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, GraduationCap, Bell, Calendar, Wallet,
  Receipt, BarChart3, Building2, Settings, LogOut, ChevronDown,
  Shield, BookOpen
} from 'lucide-react';
import Avatar from './Avatar';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student-management', icon: Users, label: 'Student Management' },
  { to: '/tutor-management', icon: GraduationCap, label: 'Tutor Management' },
  { to: '/requests', icon: Bell, label: 'Requests', badge: 3, badgeColor: 'bg-[var(--amber)]' },
  { to: '/sessions', icon: Calendar, label: 'Sessions & Monitoring' },
  { to: '/earnings', icon: Wallet, label: 'Earnings' },
  { to: '/tuition-monitoring', icon: Receipt, label: 'Tuition Monitoring' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics & Reports' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: 5, badgeColor: 'bg-[var(--red)]' },
  { to: '/university-profile', icon: Building2, label: 'University Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[260px] min-h-screen bg-[var(--navy)] flex flex-col fixed left-0 top-0 z-30">
      {/* Top Zone - White */}
      <div className="bg-white px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--slate-900)] leading-tight">EduFund</div>
            <div className="text-[10px] text-[var(--slate-500)] tracking-wider uppercase">University Portal</div>
          </div>
        </div>

        {/* University Selector */}
        <div className="border border-[var(--slate-200)] rounded-lg p-2.5 flex items-center gap-2 cursor-pointer hover:bg-[var(--slate-50)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--navy)] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--slate-900)] truncate">Benguet State University</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--mint-green)]"></div>
              <span className="text-[10px] text-[var(--mint-green)]">Verified University</span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--slate-400)] flex-shrink-0" />
        </div>
      </div>

      {/* Bottom Zone - Navy */}
      <div className="flex-1 flex flex-col overflow-y-auto py-2 px-2">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = item.to === '/dashboard'
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 group relative',
                  isActive
                    ? 'bg-[var(--primary-blue)] text-white'
                    : 'text-[var(--slate-400)] hover:text-white hover:bg-white/[0.08]'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--primary-blue)] rounded-r-full" />
                )}
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className={`${item.badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="mt-auto pt-4 pb-2 px-2">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-white/[0.08] cursor-pointer transition-colors group">
            <Avatar name="Maria Elena Cruz" size="md" color="#2563EB" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">Maria Elena Cruz</div>
              <div className="text-xs text-[var(--slate-400)]">Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--slate-400)] group-hover:text-white transition-colors" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[var(--slate-400)] hover:text-white text-xs transition-colors mt-1">
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
