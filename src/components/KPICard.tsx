import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export default function KPICard({ title, value, subtitle, icon, trend, className }: KPICardProps) {
  return (
    <div className={cn("p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/50 flex flex-col backdrop-blur-xl transition-all hover:bg-zinc-900 hover:border-zinc-700/50 hover:shadow-xl hover:-translate-y-0.5", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 font-medium text-sm tracking-wide">{title}</h3>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      
      <div className="flex items-baseline gap-2 mt-auto">
        <span className="text-3xl md:text-4xl font-semibold text-zinc-50 tracking-tight">{value}</span>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-sm">
        {trend && (
          <span className={cn(
            "font-medium px-1.5 py-0.5 rounded-md text-xs",
            trend.value > 0 ? "bg-red-500/10 text-red-400" : trend.value < 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
          )}>
            {trend.value > 0 ? '+' : ''}{trend.value}%
          </span>
        )}
        <span className="text-zinc-500">{trend ? trend.label : subtitle}</span>
      </div>
    </div>
  );
}
