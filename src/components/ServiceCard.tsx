import React from 'react';
import {
  Droplet,
  HeartPulse,
  Sprout,
  FileWarning,
  Building2,
  HardHat,
  Sparkles,
  GraduationCap,
  Baby,
  ChevronRight,
  Footprints
} from 'lucide-react';
import { DepartmentId } from '../types';

interface ServiceCardProps {
  id: DepartmentId;
  title: string;
  titleGu: string;
  isGujarati: boolean;
  onClick: () => void;
  className?: string;
}

export function ServiceCard({
  id,
  title,
  titleGu,
  isGujarati,
  onClick,
  className = ''
}: ServiceCardProps) {
  const config = React.useMemo(() => {
    switch (id) {
      case 'drinking-water':
        return {
          icon: Droplet,
          bg: 'bg-sky-50',
          text: 'text-sky-600',
          ring: 'group-hover:ring-sky-200'
        };
      case 'health':
        return {
          icon: HeartPulse,
          bg: 'bg-rose-50',
          text: 'text-rose-500',
          ring: 'group-hover:ring-rose-200'
        };
      case 'agriculture':
        return {
          icon: Sprout,
          bg: 'bg-emerald-50',
          text: 'text-emerald-600',
          ring: 'group-hover:ring-emerald-200'
        };
      case 'animal-husbandry':
        return {
          icon: Footprints,
          bg: 'bg-amber-50',
          text: 'text-amber-800',
          ring: 'group-hover:ring-amber-200'
        };
      case 'complaint-officials':
        return {
          icon: FileWarning,
          bg: 'bg-red-50',
          text: 'text-red-500',
          ring: 'group-hover:ring-red-200'
        };
      case 'panchayat':
        return {
          icon: Building2,
          bg: 'bg-indigo-50',
          text: 'text-indigo-600',
          ring: 'group-hover:ring-indigo-200'
        };
      case 'development-works':
        return {
          icon: HardHat,
          bg: 'bg-amber-50',
          text: 'text-amber-600',
          ring: 'group-hover:ring-amber-200'
        };
      case 'cleanliness':
        return {
          icon: Sparkles,
          bg: 'bg-emerald-50',
          text: 'text-emerald-500',
          ring: 'group-hover:ring-emerald-200'
        };
      case 'education':
        return {
          icon: GraduationCap,
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          ring: 'group-hover:ring-blue-200'
        };
      case 'anganwadi':
        return {
          icon: Baby,
          bg: 'bg-rose-50',
          text: 'text-rose-500',
          ring: 'group-hover:ring-rose-200'
        };
      default:
        return {
          icon: Droplet,
          bg: 'bg-slate-50',
          text: 'text-slate-600',
          ring: 'group-hover:ring-slate-200'
        };
    }
  }, [id]);

  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`group relative text-left bg-white rounded-2xl p-3 sm:p-4 md:p-5 border border-slate-100/90 service-card-shadow transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 flex items-center justify-between gap-2.5 sm:gap-3 cursor-pointer min-w-0 w-full ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        {/* Soft rounded icon badge */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full ${config.bg} ${config.text} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {id === 'animal-husbandry' ? (
            <svg
              suppressHydrationWarning
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-amber-800"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path suppressHydrationWarning d="M19.5 7.5c-.3-.8-1.1-1.3-2-1.2l-2 .2c-.4-.7-1.1-1.2-1.9-1.3l-3.2-.2c-1.3 0-2.5.8-3 2l-1.4 3.5c-.3.7-.1 1.5.4 2l1.6 1.4v4.6c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-3h3v3c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-6.5l.6-.5c.6-.5.8-1.3.5-2l-.6-1.9zM7.2 9l1-2.4c.2-.5.8-.8 1.3-.8l2.9.2c.4 0 .7.3.9.7l.6 1.3-4.5 1.8L7.2 9z" />
            </svg>
          ) : id === 'cleanliness' ? (
            <svg
              suppressHydrationWarning
              className="w-5 h-5 sm:w-6 sm:h-6 stroke-current text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path suppressHydrationWarning d="m14 4 6 6" />
              <path suppressHydrationWarning d="m18 8-8.5 8.5" />
              <path suppressHydrationWarning d="M9.5 16.5 4 22l-.5-3.5L7 15" />
              <path suppressHydrationWarning d="m5 18 3.5-3.5" />
              <path suppressHydrationWarning d="m7 20 3-3" />
            </svg>
          ) : (
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col min-w-0">
          <span
            className={`font-semibold text-slate-800 text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-snug group-hover:text-slate-950 transition-colors truncate ${
              isGujarati ? 'font-gujarati' : ''
            }`}
          >
            {isGujarati ? titleGu : title}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5">
            {isGujarati ? 'સેવા વિગત અને ફરિયાદ' : 'Grievance & Redressal'}
          </span>
        </div>
      </div>

      {/* Subtle chevron right arrow */}
      <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
  );
}
