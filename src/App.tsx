import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  FileText,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceCard } from './components/ServiceCard';
import { ComplaintModal } from './components/ComplaintModal';
import { StatusTrackerModal } from './components/StatusTrackerModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AuthModal } from './components/AuthModal';
import { EducationPage } from './components/EducationPage';
import { DirectoryPage, DirectoryType, SchoolItem, SCHOOLS_DATA } from './components/DirectoryPage';
import { SchoolDetailPage } from './components/SchoolDetailPage';
import { Complaint, DepartmentId } from './types';
import { INITIAL_COMPLAINTS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'education' | 'directory' | 'school-detail'>('home');
  const [directoryType, setDirectoryType] = useState<DirectoryType>('schools');
  const [selectedSchool, setSelectedSchool] = useState<SchoolItem>(SCHOOLS_DATA[0]);
  const [isGujarati, setIsGujarati] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);

  // Search input state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState<boolean>(false);
  const [selectedDeptForComplaint, setSelectedDeptForComplaint] = useState<DepartmentId | undefined>(undefined);

  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);
  const [trackerSearchId, setTrackerSearchId] = useState<string>('');

  const [activeServiceModal, setActiveServiceModal] = useState<DepartmentId | null>(null);

  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signin' }>({
    open: false,
    mode: 'login'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerSearchId(searchQuery.trim());
    setIsTrackerModalOpen(true);
  };

  const handleOpenComplaint = (deptId?: DepartmentId) => {
    setSelectedDeptForComplaint(deptId);
    setIsComplaintModalOpen(true);
  };

  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleExploreServicesClick = () => {
    const el = document.getElementById('explore-services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (deptId: DepartmentId) => {
    if (deptId === 'education') {
      setCurrentView('education');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveServiceModal(deptId);
    }
  };

  const handleNavigateToDirectory = (type: DirectoryType) => {
    setDirectoryType(type);
    setCurrentView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSchool = (school: SchoolItem) => {
    setSelectedSchool(school);
    setCurrentView('school-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in 'school-detail' view (Exact match of image_04def315.png)
  if (currentView === 'school-detail') {
    return (
      <>
        <SchoolDetailPage
          school={selectedSchool}
          allSchools={SCHOOLS_DATA}
          onSelectSchool={(s) => setSelectedSchool(s)}
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToEducation={() => {
            setCurrentView('education');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToSchools={() => {
            setDirectoryType('schools');
            setCurrentView('directory');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenComplaints={() => {
            setTrackerSearchId('');
            setIsTrackerModalOpen(true);
          }}
          onFileComplaint={() => handleOpenComplaint('education')}
        />

        {/* Global Modals */}
        <ComplaintModal
          isOpen={isComplaintModalOpen}
          onClose={() => setIsComplaintModalOpen(false)}
          onComplaintSubmitted={handleComplaintSubmitted}
          initialDepartmentId={selectedDeptForComplaint}
          isGujarati={isGujarati}
        />

        <StatusTrackerModal
          isOpen={isTrackerModalOpen}
          onClose={() => setIsTrackerModalOpen(false)}
          complaints={complaints}
          initialSearchQuery={trackerSearchId}
          isGujarati={isGujarati}
        />
      </>
    );
  }

  // If in 'directory' view (Schools, Teachers, or Students directory)
  if (currentView === 'directory') {
    return (
      <>
        <DirectoryPage
          initialType={directoryType}
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToEducation={() => {
            setCurrentView('education');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenComplaints={() => {
            setTrackerSearchId('');
            setIsTrackerModalOpen(true);
          }}
          onFileComplaint={(deptId) => handleOpenComplaint((deptId as DepartmentId) || 'education')}
          onSelectSchool={handleSelectSchool}
        />

        {/* Global Modals */}
        <ComplaintModal
          isOpen={isComplaintModalOpen}
          onClose={() => setIsComplaintModalOpen(false)}
          onComplaintSubmitted={handleComplaintSubmitted}
          initialDepartmentId={selectedDeptForComplaint}
          isGujarati={isGujarati}
        />

        <StatusTrackerModal
          isOpen={isTrackerModalOpen}
          onClose={() => setIsTrackerModalOpen(false)}
          complaints={complaints}
          initialSearchQuery={trackerSearchId}
          isGujarati={isGujarati}
        />
      </>
    );
  }

  // If in 'education' view, render EducationPage
  if (currentView === 'education') {
    return (
      <>
        <EducationPage
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenComplaints={() => {
            setTrackerSearchId('');
            setIsTrackerModalOpen(true);
          }}
          onFileEducationComplaint={() => handleOpenComplaint('education')}
          onNavigateToDirectory={handleNavigateToDirectory}
        />

        {/* Global Modals accessible from Education Page */}
        <ComplaintModal
          isOpen={isComplaintModalOpen}
          onClose={() => setIsComplaintModalOpen(false)}
          onComplaintSubmitted={handleComplaintSubmitted}
          initialDepartmentId={selectedDeptForComplaint}
          isGujarati={isGujarati}
        />

        <StatusTrackerModal
          isOpen={isTrackerModalOpen}
          onClose={() => setIsTrackerModalOpen(false)}
          complaints={complaints}
          initialSearchQuery={trackerSearchId}
          isGujarati={isGujarati}
        />
      </>
    );
  }

  // Default Home Page View
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FBF9F5] text-slate-900">
      {/* 1. Official Government Header */}
      <Header
        isGujarati={isGujarati}
        onToggleLanguage={() => setIsGujarati((prev) => !prev)}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
      />

      {/* 2. Main Hero & Services Split Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-5">
              {/* Kicker Tagline */}
              <div className="text-[10px] sm:text-[11.5px] font-bold text-slate-500 uppercase tracking-[0.16em]">
                {isGujarati
                  ? 'નાગરિક સેવાઓ • પારદર્શક શાસન • ઉત્તમ વાવ-થરાદ'
                  : 'CITIZEN SERVICES • TRANSPARENT GOVERNANCE • A BETTER VAV-THARAD'}
              </div>

              {/* Dominant Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] text-slate-900">
                <span className="block text-[#0B2545]">
                  {isGujarati ? 'આપનો અવાજ.' : 'Your Voice.'}
                </span>
                <span className="block text-[#EA580C]">
                  {isGujarati ? 'અમારી પ્રાથમિકતા.' : 'Our Priority.'}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
                {isGujarati
                  ? 'સ્થાનિક સેવાઓ સાથે જોડાઓ, જાહેર સમસ્યાઓ રજૂ કરો અને તમારી અરજીની સ્થિતિ એક જ જગ્યાએ ટ્રેક કરો.'
                  : 'Connect with local services, raise concerns, and track public requests in one place.'}
              </p>

              {/* Search Bar for Complaint Status */}
              <form onSubmit={handleSearchSubmit} className="pt-1">
                <div className="relative flex items-center bg-white rounded-2xl p-1.5 pl-4 sm:pl-5 border border-stone-200/90 service-card-shadow transition-all focus-within:ring-2 focus-within:ring-[#0B2545]/40 focus-within:border-[#0B2545]">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isGujarati
                        ? 'તમારી ફરિયાદની સ્થિતિ તપાસો (દા.ત. VT-2026-4401)...'
                        : 'See your complaint status...'
                    }
                    className="w-full bg-transparent text-sm sm:text-[15px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search status"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B2545] hover:bg-[#071c35] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                {/* Primary CTA: Submit a Complaint */}
                <button
                  type="button"
                  onClick={() => handleOpenComplaint()}
                  className="flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-[#0B2545] hover:bg-[#071c35] text-white font-bold text-sm sm:text-[15px] rounded-2xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <FileText className="w-4.5 h-4.5" />
                  <span>{isGujarati ? 'ફરિયાદ નોંધાવો' : 'Submit a Complaint'}</span>
                  <ChevronRight className="w-4 h-4 ml-0.5 text-white/80" />
                </button>

                {/* Secondary CTA: Explore Services */}
                <button
                  type="button"
                  onClick={handleExploreServicesClick}
                  className="flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-transparent hover:bg-stone-100/70 text-[#0B2545] border-2 border-[#0B2545]/30 hover:border-[#0B2545] font-bold text-sm sm:text-[15px] rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  <LayoutGrid className="w-4.5 h-4.5 text-[#0B2545]" />
                  <span>{isGujarati ? 'સેવાઓ જુઓ' : 'Explore Services'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (EXPLORE SERVICES GRID) ================= */}
          <div
            id="explore-services-section"
            className="lg:col-span-7 flex flex-col justify-start space-y-4"
          >
            {/* Header row of Explore Services */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
                {isGujarati ? 'સેવાઓ શોધો' : 'Explore Services'}
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                <span className="w-4 h-[2px] bg-[#EA580C] rounded-full inline-block" />
                <span>
                  {isGujarati ? 'મહત્વપૂર્ણ સેવાઓનો ઝડપી પ્રવેશ' : 'Quick access to important services'}
                </span>
              </div>
            </div>

            {/* The 10 Service Cards in the exact 4-row layout from image.png */}
            <div className="space-y-3 sm:space-y-3.5">
              {/* Row 1: 3 cards (Drinking Water, Health, Agriculture) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                <ServiceCard
                  id="drinking-water"
                  title="Drinking Water"
                  titleGu="પીવાનું પાણી"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('drinking-water')}
                />
                <ServiceCard
                  id="health"
                  title="Health"
                  titleGu="આરોગ્ય"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('health')}
                />
                <ServiceCard
                  id="agriculture"
                  title="Agriculture"
                  titleGu="ખેતીવાડી"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('agriculture')}
                />
              </div>

              {/* Row 2: 2 wider cards (Animal Husbandry, Complaint Against Officials) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <ServiceCard
                  id="animal-husbandry"
                  title="Animal Husbandry"
                  titleGu="પશુપાલન"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('animal-husbandry')}
                />
                <ServiceCard
                  id="complaint-officials"
                  title="Complaint Against Officials"
                  titleGu="અધિકારીઓ સામે ફરિયાદ"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('complaint-officials')}
                />
              </div>

              {/* Row 3: 2 wider cards (District/Taluka/Gram Panchayat, Development Works) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <ServiceCard
                  id="panchayat"
                  title="District/Taluka/Gram Panchayat"
                  titleGu="જિલ્લા/તાલુકા/ગ્રામ પંચાયત"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('panchayat')}
                />
                <ServiceCard
                  id="development-works"
                  title="Development Works"
                  titleGu="વિકાસ કાર્યો"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('development-works')}
                />
              </div>

              {/* Row 4: 3 cards (Cleanliness, Education, Anganwadi) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                <ServiceCard
                  id="cleanliness"
                  title="Cleanliness"
                  titleGu="સ્વચ્છતા"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('cleanliness')}
                />
                <ServiceCard
                  id="education"
                  title="Education"
                  titleGu="શિક્ષણ"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('education')}
                />
                <ServiceCard
                  id="anganwadi"
                  title="Anganwadi"
                  titleGu="આંગણવાડી"
                  isGujarati={isGujarati}
                  onClick={() => handleServiceClick('anganwadi')}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Official Government Footer Bar */}
      <Footer isGujarati={isGujarati} />

      {/* 4. Interactive Modals */}
      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        onComplaintSubmitted={handleComplaintSubmitted}
        initialDepartmentId={selectedDeptForComplaint}
        isGujarati={isGujarati}
      />

      <StatusTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        complaints={complaints}
        initialSearchQuery={trackerSearchId}
        isGujarati={isGujarati}
      />

      <ServiceDetailModal
        departmentId={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onFileComplaint={(deptId) => handleOpenComplaint(deptId)}
        isGujarati={isGujarati}
      />

      <AuthModal
        isOpen={authModal.open}
        mode={authModal.mode}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        isGujarati={isGujarati}
      />
    </div>
  );
}
