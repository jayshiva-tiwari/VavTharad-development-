'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  FileText,
  ChevronRight,
  GraduationCap,
  Droplet,
  HeartPulse,
  Sprout,
  Users,
  Construction,
  Baby,
  LayoutGrid
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ServiceCard } from '@/src/components/ServiceCard';
import { ComplaintModal } from '@/src/components/ComplaintModal';
import { StatusTrackerModal } from '@/src/components/StatusTrackerModal';
import { ServiceDetailModal } from '@/src/components/ServiceDetailModal';
import { AuthModal } from '@/src/components/AuthModal';
import { Complaint, DepartmentId, UserSession } from '@/src/types';
import { INITIAL_COMPLAINTS } from '@/src/data/mockData';

const SERVICES_LIST: { id: DepartmentId; title: string; titleGu: string }[] = [
  { id: 'drinking-water', title: 'Drinking Water', titleGu: 'પીવાનું પાણી' },
  { id: 'health', title: 'Health', titleGu: 'આરોગ્ય' },
  { id: 'agriculture', title: 'Agriculture', titleGu: 'ખેતીવાડી' },
  { id: 'animal-husbandry', title: 'Animal Husbandry', titleGu: 'પશુપાલન' },
  { id: 'complaint-officials', title: 'Official Misconduct', titleGu: 'અધિકારીઓ વિરુદ્ધ ફરિયાદ' },
  { id: 'panchayat', title: 'Panchayat', titleGu: 'પંચાયત' },
  { id: 'development-works', title: 'Development Works', titleGu: 'વિકાસ કાર્યો' },
  { id: 'cleanliness', title: 'Cleanliness', titleGu: 'સ્વચ્છતા' },
  { id: 'education', title: 'Education', titleGu: 'શિક્ષણ' },
  { id: 'anganwadi', title: 'Anganwadi', titleGu: 'આંગણવાડી' },
];

export default function HomePage() {
  const [isGujarati, setIsGujarati] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' | 'signin'; isMandatory: boolean }>({
    open: true,
    mode: 'login',
    isMandatory: true,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState<boolean>(false);
  const [selectedDeptForComplaint, setSelectedDeptForComplaint] = useState<DepartmentId | undefined>(undefined);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);
  const [trackerSearchId, setTrackerSearchId] = useState<string>('');
  const [activeServiceModal, setActiveServiceModal] = useState<DepartmentId | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerSearchId(searchQuery.trim());
    setIsTrackerModalOpen(true);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vav_tharad_user_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.isLoggedIn) {
            setCurrentUser(parsed);
            setAuthModal({ open: false, mode: 'login', isMandatory: false });
          } else {
            setAuthModal({ open: true, mode: 'login', isMandatory: true });
          }
        } else {
          setAuthModal({ open: true, mode: 'login', isMandatory: true });
        }
      } catch (err) {
        setAuthModal({ open: true, mode: 'login', isMandatory: true });
      }

      if (window.location.hash === '#tracker' || window.location.hash === '#complaints') {
        setIsTrackerModalOpen(true);
      } else if (window.location.hash === '#complaint') {
        setIsComplaintModalOpen(true);
      }
    }
  }, []);

  return (
    <div suppressHydrationWarning className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-800 antialiased font-sans">
      <Header
        isGujarati={isGujarati}
        onToggleLanguage={() => setIsGujarati(!isGujarati)}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode, isMandatory: false })}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          try {
            localStorage.removeItem('vav_tharad_user_session');
          } catch (e) {
            console.error(e);
          }
          setAuthModal({ open: true, mode: 'login', isMandatory: true });
        }}
        onOpenComplaints={() => setIsTrackerModalOpen(true)}
      />

      <main suppressHydrationWarning className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col relative">
            {/* Top Eyebrow Tag */}
            <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-[11px] md:text-xs font-bold text-slate-500 tracking-[0.16em] uppercase mb-3 sm:mb-4">
              <span>Citizen Services</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Transparent Governance</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>A Better Vav-Tharad</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-black tracking-tight leading-[1.06] text-[#0B2545] font-sans">
              Your Voice.
              <br />
              <span className="text-[#EA580C]">Our Priority.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-md">
              {isGujarati
                ? 'સ્થાનિક સેવાઓ સાથે જોડાઓ, સમસ્યાઓ રજૂ કરો અને જાહેર વિનંતીઓ એક જ જગ્યાએ ટ્રેક કરો.'
                : 'Connect with local services, raise concerns, and track public requests in one place.'}
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-5 sm:mt-6 w-full max-w-lg">
              <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-2xs p-1.5 pl-4 sm:pl-5 transition-all focus-within:ring-2 focus-within:ring-[#0B2545]/20 focus-within:border-[#0B2545]">
                <Search className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={2} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isGujarati ? 'તમારી ફરિયાદની સ્થિતિ જુઓ...' : 'See your complaint status...'}
                  className="w-full pl-3 pr-12 py-2 text-sm sm:text-[15px] text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Track complaint"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B2545] hover:bg-[#133E68] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>

            {/* Action Buttons: Submit a Complaint & Explore Services */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsComplaintModalOpen(true)}
                className="px-5 sm:px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#133E68] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white" strokeWidth={2.2} />
                <span>{isGujarati ? 'ફરિયાદ નોંધાવો' : 'Submit a Complaint'}</span>
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('explore-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 sm:px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0B2545] border-1.5 border-[#0B2545] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 text-[#0B2545]" strokeWidth={2.2} />
                <span>{isGujarati ? 'સેવાઓ જુઓ' : 'Explore Services'}</span>
              </button>
            </div>

            {/* Heritage Artwork Landscape (Photo from Vav-Tharad) */}
            <div className="mt-5 sm:mt-6 relative rounded-2xl overflow-hidden select-none pointer-events-none border border-amber-900/10 shadow-2xs">
              <img
                src="/assets/heritage_banner.png"
                alt="Vav-Tharad Heritage Architecture and Slogan"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: EXPLORE SERVICES ================= */}
          <div id="explore-services" className="lg:col-span-7 flex flex-col">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight font-sans">
                {isGujarati ? 'મુખ્ય સેવાઓ' : 'Explore Services'}
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 font-medium">
                <span className="w-3.5 sm:w-4 h-0.5 bg-[#EA580C] rounded-full inline-block" />
                <span>{isGujarati ? 'મહત્વની સેવાઓ સુધી ત્વરિત પ્રવેશ' : 'Quick access to important services'}</span>
              </div>
            </div>

            {/* 3 - 2 - 2 - 3 Services Grid */}
            <div className="flex flex-col gap-2.5 sm:gap-3.5">
              {/* Row 1: 3 cards */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {/* 1. Drinking Water */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('drinking-water')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between h-[100px] sm:h-[112px] group text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Droplet className="w-5 h-5 text-blue-600" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Drinking<br />Water
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>

                {/* 2. Health */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('health')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between h-[100px] sm:h-[112px] group text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <HeartPulse className="w-5 h-5 text-rose-500" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Health
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>

                {/* 3. Agriculture */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('agriculture')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between h-[100px] sm:h-[112px] group text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sprout className="w-5 h-5 text-emerald-600" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Agriculture
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              </div>

              {/* Row 2: 2 wider cards */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* 4. Animal Husbandry */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('animal-husbandry')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between h-[74px] sm:h-[80px] group text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50/90 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <svg
                        suppressHydrationWarning
                        className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-amber-800"
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path suppressHydrationWarning d="M19 7c-.5-.6-1.3-.9-2-.8l-1.8.2c-.4-.6-1-.9-1.8-1l-3-.2c-1.2 0-2.3.7-2.8 1.8L6.4 10c-.3.6-.1 1.3.4 1.8l1.4 1.2v4c0 .6.5 1 1 1h1c.6 0 1-.4 1-1v-2.5h3v2.5c0 .6.5 1 1 1h1c.6 0 1-.4 1-1V12l.5-.4c.5-.4.7-1.1.4-1.7l-.5-1.6z" />
                        <circle suppressHydrationWarning cx="8" cy="9" r="0.5" fill="#92400E" />
                      </svg>
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Animal<br />Husbandry
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>

                {/* 5. Complaint Against Officials */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('complaint-officials')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between h-[74px] sm:h-[80px] group text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5 text-rose-500" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Complaint<br />Against Officials
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              </div>

              {/* Row 3: 2 wider cards */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* 6. District/Taluka/Gram Panchayat */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('panchayat')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between h-[74px] sm:h-[80px] group text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5 text-indigo-600" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      District/Taluka/<br />Gram Panchayat
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>

                {/* 7. Development Works */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('development-works')}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between h-[74px] sm:h-[80px] group text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Construction className="w-5 h-5 text-amber-600" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-[14px] leading-tight">
                      Development<br />Works
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              </div>

              {/* Row 4: 3 cards */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {/* 8. Cleanliness */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('cleanliness')}
                  className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center gap-2 sm:gap-3 h-[64px] sm:h-[72px] group text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg
                      suppressHydrationWarning
                      className="w-5 h-5 stroke-emerald-600"
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
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-[13.5px] leading-tight truncate">
                    Cleanliness
                  </span>
                </button>

                {/* 9. Education (Direct App Router link to Education Dashboard!) */}
                <Link
                  href="/education"
                  className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between h-[64px] sm:h-[72px] group text-left"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5 text-blue-600" strokeWidth={2.2} />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-[13.5px] leading-tight truncate group-hover:text-blue-700 transition-colors">
                      Education
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>

                {/* 10. Anganwadi */}
                <button
                  type="button"
                  onClick={() => setActiveServiceModal('anganwadi')}
                  className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center gap-2 sm:gap-3 h-[64px] sm:h-[72px] group text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Baby className="w-5 h-5 text-rose-500" strokeWidth={2.2} />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-[13.5px] leading-tight truncate">
                    Anganwadi
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer isGujarati={isGujarati} />

      {/* Modals */}
      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        isGujarati={isGujarati}
        initialDepartmentId={selectedDeptForComplaint}
        currentUser={currentUser}
        onComplaintSubmitted={(c) => setComplaints((prev) => [c, ...prev])}
      />

      <StatusTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        isGujarati={isGujarati}
        complaints={complaints}
        initialSearchQuery={trackerSearchId}
      />

      <ServiceDetailModal
        departmentId={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        isGujarati={isGujarati}
        onFileComplaint={(id) => {
          setActiveServiceModal(null);
          setSelectedDeptForComplaint(id);
          setIsComplaintModalOpen(true);
        }}
      />

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        mode={authModal.mode}
        isGujarati={isGujarati}
        isMandatory={authModal.isMandatory}
        onSuccess={(session) => {
          setCurrentUser(session);
          try {
            localStorage.setItem('vav_tharad_user_session', JSON.stringify(session));
          } catch (e) {
            console.error(e);
          }
          setAuthModal({ open: false, mode: 'login', isMandatory: false });
        }}
      />
    </div>
  );
}
