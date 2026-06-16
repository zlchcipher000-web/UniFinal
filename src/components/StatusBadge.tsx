import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  Active: { bg: 'bg-[var(--mint-light)]', text: 'text-[var(--mint-green)]' },
  Paid: { bg: 'bg-[var(--mint-light)]', text: 'text-[var(--mint-green)]' },
  Verified: { bg: 'bg-[var(--mint-light)]', text: 'text-[var(--mint-green)]' },
  Completed: { bg: 'bg-[var(--mint-light)]', text: 'text-[var(--mint-green)]' },
  Approved: { bg: 'bg-[var(--mint-light)]', text: 'text-[var(--mint-green)]' },
  Partial: { bg: 'bg-[var(--amber-light)]', text: 'text-[var(--amber)]' },
  Pending: { bg: 'bg-[var(--amber-light)]', text: 'text-[var(--amber)]' },
  'Pending Review': { bg: 'bg-[var(--amber-light)]', text: 'text-[var(--amber)]' },
  Suspended: { bg: 'bg-[var(--amber-light)]', text: 'text-[var(--amber)]' },
  Overdue: { bg: 'bg-[var(--red-light)]', text: 'text-[var(--red)]' },
  Declined: { bg: 'bg-[var(--red-light)]', text: 'text-[var(--red)]' },
  Cancelled: { bg: 'bg-[var(--red-light)]', text: 'text-[var(--red)]' },
  'In Progress': { bg: 'bg-[var(--sky-blue)]', text: 'text-[var(--primary-blue)]' },
  Ongoing: { bg: 'bg-[var(--sky-blue)]', text: 'text-[var(--primary-blue)]' },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] || { bg: 'bg-[var(--slate-100)]', text: 'text-[var(--slate-500)]' };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium', style.bg, style.text, className)}>
      {status}
    </span>
  );
}
