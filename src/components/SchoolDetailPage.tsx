import React, { useState } from 'react';
import {
  ChevronRight,
  School,
  Building,
  Users,
  Presentation,
  BookOpen,
  MapPin,
  Send,
  Search,
  CheckCircle2,
  FileText,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  Home
} from 'lucide-react';
import { EmblemLogo } from './EmblemLogo';

export interface SchoolDetailData {
  id: string;
  name: string;
  type: 'Private School' | 'Government School';
  taluka: string;
  address: string;
  studentsCount: number;
  teachersCount: number;
  principal: string;
  phone: string;
  email: string;
  medium: string;
  grades: string;
  facilities: string[];
}

interface SchoolDetailPageProps {
  school: SchoolDetailData;
  allSchools: SchoolDetailData[];
  onSelectSchool: (school: SchoolDetailData) => void;
  onBackToHome: () => void;
  onBackToEducation: () => void;
  onBackToSchools: () => void;
  onOpenComplaints: () => void;
  onFileComplaint: (schoolName: string) => void;
}

export function SchoolDetailPage({
  school,
  allSchools,
  onSelectSchool,
  onBackToHome,
  onBackToEducation,
  onBackToSchools,
  onOpenComplaints,
  onFileComplaint
}: SchoolDetailPageProps) {
  const [searchInput, setSearchInput] = useState(school.name);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const matchingSchools = allSchools.filter((s) =>
    s.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchingSchools.length > 0) {
      onSelectSchool(matchingSchools[0]);
      setShowSearchResults(false);
    }
  };

  const handleGetDirections = () => {
    const encoded = encodeURIComponent(`${school.name}, ${school.address}, Gujarat`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F7FC]/80 text-slate-900">
      {/* 1. Header with Vav-Tharad branding matching image_04def315.png */}
      <header className="relative w-full bg-white border-b border-stone-200/80 shadow-xs z-30 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Emblem of India and Vav-Tharad branding */}
          <button
            type="button"
            onClick={onBackToHome}
            className="text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 rounded-lg shrink-0"
          >
            <EmblemLogo />
          </button>

          {/* Right: "Your Complaints" button and "Shiva" user profile with circular initial "S" */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* "Your Complaints" button */}
            <button
              type="button"
              onClick={onOpenComplaints}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-stone-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B2545]" />
              <span className="hidden xs:inline">Your Complaints</span>
              <span className="xs:hidden">Complaints</span>
            </button>

            {/* User Profile Pill matching image_04def315: circle badge "S" + Shiva + chevron */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 sm:pr-2.5 py-1 bg-white hover:bg-stone-50 border border-slate-200 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none active:scale-95"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs sm:text-sm ring-1 ring-blue-200">
                  S
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 hidden xs:inline">Shiva</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs">
                  <div className="px-3 py-2.5 border-b border-stone-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Shiva Tiwari</p>
                      <p className="text-[11px] text-slate-500">Citizen • Vav-Tharad</p>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenComplaints();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between"
                    >
                      <span>Track Active Grievances</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        3
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onFileComplaint(school.name);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between"
                    >
                      <span>Report Issue for {school.name}</span>
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onBackToSchools();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700"
                    >
                      Back to All Schools Directory
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onBackToHome();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700"
                    >
                      Return to Main District Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content */}
      <main className="relative flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Top-Right Background: Heritage Temple & Sun Skyline */}
        <div className="absolute top-2 right-4 sm:right-8 w-60 sm:w-80 md:w-[420px] h-24 sm:h-32 md:h-40 pointer-events-none opacity-20 sm:opacity-35 overflow-hidden select-none -z-0">
          <img
            src="/assets/education/temple_sun_skyline.png"
            alt="Gujarat Heritage"
            className="w-full h-full object-contain object-right-top mix-blend-multiply"
          />
        </div>

        {/* Breadcrumb matching image: Home > Education > Schools */}
        <div className="relative z-10 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 overflow-x-auto py-0.5">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-1 text-slate-600 hover:text-[#0B2545] transition-colors cursor-pointer shrink-0"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            type="button"
            onClick={onBackToEducation}
            className="text-slate-600 hover:text-[#0B2545] transition-colors cursor-pointer shrink-0"
          >
            Education
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            type="button"
            onClick={onBackToSchools}
            className="text-[#0052CC] font-bold hover:underline cursor-pointer shrink-0"
          >
            Schools
          </button>
        </div>

        {/* Top Search & Stats Bar matching image_04def315.png */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Left: Search Box showing the current school name */}
          <div className="lg:col-span-5 relative w-full">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center bg-white rounded-2xl p-1.5 pl-3.5 sm:pl-5 border border-stone-200 shadow-xs focus-within:ring-2 focus-within:ring-[#0B2545]/40 focus-within:border-[#0B2545]">
                <input
                  type="text"
                  value={searchInput}
                  onFocus={() => setShowSearchResults(true)}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowSearchResults(true);
                  }}
                  placeholder="Search schools by name..."
                  className="w-full bg-transparent text-sm sm:text-base md:text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#0B2545] hover:bg-[#071c35] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown if user edits search input */}
            {showSearchResults && matchingSchools.length > 0 && searchInput !== school.name && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-40 max-h-60 overflow-y-auto">
                {matchingSchools.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onSelectSchool(s);
                      setSearchInput(s.name);
                      setShowSearchResults(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <span>{s.name}</span>
                    <span className="text-[11px] text-slate-400">{s.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: The Two KPI Cards matching image_04def315.png */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-4">
            {/* Card 1: 08 Private Schools Across Vav-Tharad */}
            <button
              type="button"
              onClick={onBackToSchools}
              className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <School className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                    08
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                    Private Schools
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">Across Vav-Tharad</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Card 2: 07 Government Schools Across Vav-Tharad */}
            <button
              type="button"
              onClick={onBackToSchools}
              className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                    07
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                    Govt Schools
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">Across Vav-Tharad</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          </div>
        </div>

        {/* 3. Main Detailed School Container matching image_04def315.png */}
        <div className="relative z-10 bg-white rounded-3xl p-4 sm:p-7 md:p-8 border border-slate-100 shadow-xs space-y-5 sm:space-y-6">
          {/* Header of School Card: Icon + School Name + Verified Blue Badge */}
          <div className="flex items-center gap-3 sm:gap-3.5 pb-2.5 border-b border-stone-100 min-w-0">
            {/* School Building Icon */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <School className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Title with verified check badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight truncate">
                {school.name}
              </h2>
              {/* Blue Verified Badge SVG matching image */}
              <div className="flex items-center justify-center text-[#1D9BF0] shrink-0" title="Verified Institution">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22.5 12.5c0-1.58-.8-2.98-2.02-3.8.34-1.53-.13-3.14-1.27-4.28s-2.75-1.61-4.28-1.27C14.13 2 12.73 1.2 11.15 1.2s-2.98.8-3.8 2.02c-1.53-.34-3.14.13-4.28 1.27s-1.61 2.75-1.27 4.28C.6 9.5-.2 10.9.2 12.5s.8 2.98 2.02 3.8c-.34 1.53.13 3.14 1.27 4.28s2.75 1.61 4.28 1.27c.82 1.22 2.22 2.02 3.8 2.02s2.98-.8 3.8-2.02c1.53.34 3.14-.13 4.28-1.27s1.61-2.75 1.27-4.28c1.22-.82 2.02-2.22 2.02-3.8zm-11.8 4.2l-3.9-3.9 1.4-1.4 2.5 2.5 6.4-6.4 1.4 1.4-7.8 7.8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: About the School (Left) & Location / Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* ================= LEFT BOX: About the School ================= */}
            <div className="bg-[#FAFBFD] rounded-2xl p-4 sm:p-6 border border-slate-100 flex flex-col justify-between space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-[#0B2545]">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                    About the School
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Learn about the school, its facilities, and academic environment.
                </p>
              </div>

              {/* Two Stat Sub-boxes: Students & Teachers matching image */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                {/* Students Card */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-100/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-none block">
                      {school.studentsCount || 100}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-700 mt-1 truncate">
                      Students
                    </span>
                  </div>
                </div>

                {/* Teachers Card */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-100/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Presentation className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-none block">
                      {school.teachersCount || 19}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-700 mt-1 truncate">
                      Teachers
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Details List */}
              <div className="pt-2 border-t border-stone-200/60 text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-bold text-slate-800">{school.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Medium:</span>
                  <span className="font-bold text-slate-800 truncate ml-2">{school.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Grades:</span>
                  <span className="font-bold text-slate-800 truncate ml-2">{school.grades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Principal:</span>
                  <span className="font-bold text-slate-800 truncate ml-2">{school.principal}</span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT BOX: Location & Map ================= */}
            <div className="bg-[#FAFBFD] rounded-2xl p-4 sm:p-6 border border-slate-100 flex flex-col justify-between space-y-3.5 sm:space-y-4">
              {/* Header: Location & Get Directions */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-600">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                      Location
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleGetDirections}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0052CC] hover:text-blue-800 transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Get directions</span>
                  </button>
                </div>

                {/* Address text matching image */}
                <p className="text-xs sm:text-sm text-slate-600 mt-1 truncate">
                  XYZ Nagar, Vav-Tharad, Gujarat
                </p>
              </div>

              {/* Map Preview Graphic from image_04def315.png */}
              <div
                onClick={handleGetDirections}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs group cursor-pointer"
                title="Click to open interactive navigation map"
              >
                <img
                  src="/assets/education/school_map_preview.png"
                  alt="School Location Map"
                  className="w-full h-36 sm:h-44 md:h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[#0B2545] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md backdrop-blur-xs transition-opacity">
                    Open in Google Maps ↗
                  </span>
                </div>
              </div>

              {/* Campus Contact Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                <a
                  href={`tel:${school.phone}`}
                  className="flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{school.phone}</span>
                </a>
                <a
                  href={`mailto:${school.email}`}
                  className="flex items-center gap-1.5 text-sky-700 font-medium hover:underline truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{school.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Action Row: Report Issue for this School & Switch School */}
          <div className="pt-3 sm:pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gujarat School Quality Accreditation Council (GSQAC) Certified</span>
            </div>

            <div className="flex flex-col xs:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBackToSchools}
                className="w-full xs:w-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
              >
                ← Back to Schools List
              </button>
              <button
                type="button"
                onClick={() => onFileComplaint(school.name)}
                className="w-full xs:w-auto px-5 py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>File Grievance for School</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="w-full bg-white border-t border-stone-200/80 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">District Primary Education Officer</span>
            <span>•</span>
            <span>Vav-Tharad District Administration, Gujarat</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-600">
            <button
              type="button"
              onClick={onBackToSchools}
              className="text-[#0B2545] font-bold hover:underline"
            >
              All Schools Directory
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-slate-600 hover:text-slate-900"
            >
              Main Portal Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
