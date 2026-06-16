import { type LucideIcon } from 'lucide-react';
import { formatPeso } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  trend?: number;
  isCurrency?: boolean;
  iconBg?: string;
  iconColor?: string;
}

export default function StatCard({ icon: Icon, value, label, trend, isCurrency = false, iconBg = 'bg-[var(--sky-blue)]', iconColor = 'text-[var(--primary-blue)]' }: StatCardProps) {
  const displayValue = isCurrency && typeof value === 'number' ? formatPeso(value) : value;

  return (
    <div className="card card-padding">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium flex items-center gap-0.5 ${trend >= 0 ? 'text-[var(--mint-green)]' : 'text-[var(--red)]'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            <span className="text-[var(--slate-400)] font-normal ml-0.5">from last month</span>
          </span>
        )}
      </div>
      <div className="text-[28px] font-bold text-[var(--slate-900)] leading-tight">{displayValue}</div>
      <div className="text-xs text-[var(--slate-500)] mt-1">{label}</div>
    </div>
  );
}
