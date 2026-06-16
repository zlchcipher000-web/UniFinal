import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { useMemo } from 'react';

const pageInfo: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: "Welcome back, Maria Elena! Here's what's happening in Benguet State University." },
  '/student-management': { title: 'Student Management', subtitle: 'Manage and monitor all student tutor accounts in your university.' },
  '/tutor-management': { title: 'Tutor Management', subtitle: 'Manage and oversee student tutors in your university.' },
  '/requests': { title: 'Requests', subtitle: 'Review and manage tutoring requests.' },
  '/sessions': { title: 'Sessions & Monitoring', subtitle: 'Monitor ongoing and completed tutoring sessions.' },
  '/earnings': { title: 'Earnings', subtitle: 'Track student tutor earnings and payouts.' },
  '/tuition-monitoring': { title: 'Tuition Monitoring', subtitle: 'Monitor and manage student tuition payments and balances.' },
  '/analytics': { title: 'Analytics & Reports', subtitle: 'Gain insights about tutoring activities and performance.' },
  '/notifications': { title: 'Notifications', subtitle: 'View and manage your notifications.' },
  '/university-profile': { title: 'University Profile', subtitle: 'View and manage your university information.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account and portal preferences.' },
};

export default function AppLayout() {
  const location = useLocation();

  const { title, subtitle } = useMemo(() => {
    const path = location.pathname;
    for (const [route, info] of Object.entries(pageInfo)) {
      if (path === route || path.startsWith(route + '/')) {
        return info;
      }
    }
    return { title: 'EduFund', subtitle: '' };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[260px]">
        <TopHeader title={title} subtitle={subtitle} />
        <main className="fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
