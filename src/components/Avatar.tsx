import { getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
};

export default function Avatar({ name, color = '#2563EB', size = 'md', className }: AvatarProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${sizeMap[size]} ${className || ''}`}
      style={{ backgroundColor: color }}
    >
      {getInitials(name)}
    </div>
  );
}
