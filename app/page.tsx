'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, FileText, ChevronRight, GraduationCap } from 'lucide-react';
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
    open: false,
    mode: 'login',
    isMandatory: false,
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-800 antialiased font-sans">
      <Header
        isGujarati={isGujarati}
        onToggleLanguage={() => setIsGujarati(!isGujarati)}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode, isMandatory: false })}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        onOpenComplaints={() => setIsTrackerModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Banner with Next.js router link to Education */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#0B2545] to-[#133E68] text-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
              ⚡ Next.js App Router
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {isGujarati ? 'વાવ-થરાદ જિલ્લા વહીવટી પોર્ટલ' : 'Vav-Tharad District Administration Portal'}
            </h1>
            <p className="mt-2 text-sm text-blue-100 max-w-xl">
              {isGujarati
                ? 'જિલ્લા શિક્ષણ પોર્ટલ, શાળાઓ, શિક્ષકો, વિદ્યાર્થીઓ અને જાહેર ફરિયાદ નિવારણ વ્યવસ્થા.'
                : 'District Education Department, 15 Schools Directory, Teacher & Student Registries, and Public Grievance Desk.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/education"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-bold text-white shadow-md flex items-center gap-2 text-sm transition-all active:scale-95"
            >
              <GraduationCap className="w-5 h-5" />
              <span>{isGujarati ? 'શિક્ષણ વિભાગ પોર્ટલ' : 'Education Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsComplaintModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 flex items-center gap-2 text-sm transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{isGujarati ? 'નવી ફરિયાદ નોંધાવો' : 'File Grievance'}</span>
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="mb-10 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isGujarati ? 'ફરિયાદ નંબર અથવા સેવા શોધો...' : 'Track Grievance ID or search department...'}
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-stone-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 bg-[#0B2545] hover:bg-[#133E68] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isGujarati ? 'ટ્રેક કરો' : 'Track'}
            </button>
          </div>
        </form>

        {/* Department Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              {isGujarati ? 'જિલ્લા સેવાઓ અને વિભાગો' : 'District Services & Departments'}
            </h2>
            <Link href="/education" className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1">
              <span>{isGujarati ? 'શિક્ષણ વિભાગ ખોલો' : 'Open Education Portal'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES_LIST.map((dept) => (
              <ServiceCard
                key={dept.id}
                id={dept.id}
                title={dept.title}
                titleGu={dept.titleGu}
                isGujarati={isGujarati}
                onClick={() => {
                  if (dept.id === 'education') {
                    window.location.href = '/education';
                  } else {
                    setActiveServiceModal(dept.id);
                  }
                }}
              />
            ))}
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
          setAuthModal({ ...authModal, open: false });
        }}
      />
    </div>
  );
}
