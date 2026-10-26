'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutGrid,
  FilePlus2,
  GraduationCap,
  FileText,
  User
} from 'lucide-react';
import { UserSession } from '../types';

interface MobileBottomNavProps {
  onOpenComplaint: () => void;
  onOpenTracker: () => void;
  onOpenAuth?: (mode: 'login' | 'signup' | 'signin') => void;
  currentUser?: UserSession | null;
  isGujarati?: boolean;
}

export function MobileBottomNav({
  onOpenComplaint,
  onOpenTracker,
  onOpenAuth,
  currentUser,
  isGujarati = false,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isEducation = pathname?.startsWith('/education');

  const scrollToServices = () => {
    if (isHome) {
      const el = document.getElementById('explore-services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = '/#explore-services';
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(15,23,42,0.1)] pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-1.5 px-3 select-none"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-between gap-1">
        {/* 1. Home Tab */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all tap-feedback active:scale-95 ${
            isHome
              ? 'text-[#0B2545] font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            <Home className="w-5 h-5" strokeWidth={isHome ? 2.5 : 2} />
            {isHome && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate font-semibold">
            {isGujarati ? 'હોમ' : 'Home'}
          </span>
        </Link>

        {/* 2. Explore Services Tab */}
        <button
          type="button"
          onClick={scrollToServices}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl text-slate-500 hover:text-slate-900 font-medium transition-all tap-feedback active:scale-95 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            <LayoutGrid className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate font-semibold">
            {isGujarati ? 'સેવાઓ' : 'Services'}
          </span>
        </button>

        {/* 3. Center Elevated CTA: File Complaint (Primary Floating Action in Thumb Zone) */}
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={onOpenComplaint}
            aria-label="File a Grievance"
            className="w-13 h-13 -mt-6 rounded-full bg-gradient-to-tr from-[#0B2545] via-[#102c57] to-[#133E68] text-white flex items-center justify-center shadow-lg shadow-[#0B2545]/35 ring-4 ring-white transition-transform active:scale-90 tap-feedback cursor-pointer"
          >
            <FilePlus2 className="w-5 h-5 text-amber-300" strokeWidth={2.4} />
          </button>
          <span className="text-[10px] font-extrabold text-[#0B2545] mt-1 tracking-tight truncate">
            {isGujarati ? 'ફરિયાદ' : 'Complaint'}
          </span>
        </div>

        {/* 4. Education Tab */}
        <Link
          href="/education"
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all tap-feedback active:scale-95 ${
            isEducation
              ? 'text-[#0B2545] font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            <GraduationCap className="w-5 h-5" strokeWidth={isEducation ? 2.5 : 2} />
            {isEducation && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate font-semibold">
            {isGujarati ? 'શિક્ષણ' : 'Education'}
          </span>
        </Link>

        {/* 5. Track or Profile Tab */}
        <button
          type="button"
          onClick={onOpenTracker}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl text-slate-500 hover:text-slate-900 font-medium transition-all tap-feedback active:scale-95 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            {currentUser?.isLoggedIn ? (
              <div className="w-6 h-6 rounded-full bg-[#0B2545] text-white text-[11px] font-bold flex items-center justify-center ring-1 ring-blue-200">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
            ) : (
              <FileText className="w-5 h-5 text-slate-600" strokeWidth={2} />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate font-semibold">
            {currentUser?.isLoggedIn ? 'Status' : 'Track'}
          </span>
        </button>
      </div>
    </nav>
  );
}
