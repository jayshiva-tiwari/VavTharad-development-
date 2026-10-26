import { useState } from 'react';
import {
  Home,
  ChevronRight,
  Users,
  Presentation,
  Building,
  GraduationCap,
  Megaphone,
  Camera,
  Calendar,
  FileText,
  ChevronDown,
  X,
  Sparkles,
  Phone,
  Mail,
  LogOut
} from 'lucide-react';
import { EmblemLogo } from './EmblemLogo';
import { DirectoryType } from './DirectoryPage';
import { UserSession } from '../types';

interface EducationPageProps {
  onBackToHome: () => void;
  onOpenComplaints: () => void;
  onFileEducationComplaint: () => void;
  onNavigateToDirectory: (type: DirectoryType) => void;
  currentUser?: UserSession | null;
  onLogout?: () => void;
}

export function EducationPage({
  onBackToHome,
  onOpenComplaints,
  onFileEducationComplaint,
  onNavigateToDirectory,
  currentUser,
  onLogout
}: EducationPageProps) {
  // State for user profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // State for active modal / lightbox
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    desc: string;
  } | null>(null);

  const [selectedUpdate, setSelectedUpdate] = useState<{
    title: string;
    date: string;
    statusColor: string;
    detail: string;
  } | null>(null);

  const [selectedOfficer, setSelectedOfficer] = useState<{
    name: string;
    designation: string;
    image: string;
    dept: string;
    bio: string;
    phone: string;
    email: string;
  } | null>(null);

  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Updates list matching image
  const updatesList = [
    {
      id: 'update-1',
      title: 'Update 1',
      subheading: 'Annual Science Fair & STEM Workshop Dates Released for Vav-Tharad Schools',
      date: '15 Oct 2026',
      statusColor: 'bg-emerald-500',
      detail:
        'The District Primary Education Office has finalized dates for the Vav-Tharad Inter-School Science Fair. Participating government schools will display student models on water conservation and renewable energy at Tharad Ganj School Campus.'
    },
    {
      id: 'update-2',
      title: 'Update 2',
      subheading: 'PM-POSHAN (Mid-Day Meal) Quality & Hygiene Inspection Drive',
      date: '10 Oct 2026',
      statusColor: 'bg-amber-500',
      detail:
        'District inspection teams conducted quality verification tests across 15 rural school kitchens. New stainless steel hot cases and filtered RO drinking water units installed in 8 border village primary schools.'
    },
    {
      id: 'update-3',
      title: 'Update 3',
      subheading: 'Free Textbook & Tablet Distribution for Standards 6th to 8th',
      date: '05 Oct 2026',
      statusColor: 'bg-blue-500',
      detail:
        'Over 5,000 sets of revised Gujarati and English curriculum textbooks, digital learning tablets, and geometry kits successfully distributed to all enrolled students across Vav, Tharad, and Suigam blocks.'
    }
  ];

  // Activities photo gallery matching image
  const schoolPhotos = [
    {
      id: 'photo-1',
      src: '/assets/education/activity_girls_classroom.png',
      title: 'Digital Classrooms & Interactive Learning',
      desc: 'Students engaged in interactive peer learning sessions at Model Primary School, Tharad.'
    },
    {
      id: 'photo-2',
      src: '/assets/education/activity_school_building.png',
      title: 'Government Primary School (પ્રાથમિક શાળા)',
      desc: 'Newly renovated school campus with modern sanitation, solar rooftop, and library.'
    },
    {
      id: 'photo-3',
      src: '/assets/education/activity_science_lab.png',
      title: 'Science & Microscopy Lab Session',
      desc: 'Young innovators conducting biological cell observations under student microscopes.'
    },
    {
      id: 'photo-4',
      src: '/assets/education/activity_school_prayer.png',
      title: 'Morning Yoga & Cultural Assembly',
      desc: 'Daily physical training, yoga, and community prayer session in the school quadrangle.'
    },
    {
      id: 'photo-5',
      src: '/assets/education/activity_tree_plantation.png',
      title: 'Eco-Club Green Plantation Drive',
      desc: 'Students planting indigenous neem and banyan saplings to promote green school campuses.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F7FC]/80 text-slate-900">
      {/* 1. Header with panoramic background matching image_32066463.png */}
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs overflow-hidden">
        {/* Subtle Panoramic Heritage Temple & Landscape in Header Center */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 sm:opacity-50">
          <img
            src="/assets/education/header_panorama.png"
            alt="Heritage Background"
            className="w-full h-full object-cover object-center mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          {/* Left: Emblem of India and Vav-Tharad branding */}
          <EmblemLogo href="/" />

          {/* Right: "Your Complaints" button and "Shiva" user profile */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* "Your Complaints" button */}
            <button
              type="button"
              onClick={onOpenComplaints}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-stone-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-[#0B2545]" />
              <span className="hidden xs:inline">Your Complaints</span>
              <span className="xs:hidden">Complaints</span>
            </button>

            {/* User Profile Pill with Shiva avatar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 bg-white hover:bg-stone-50 border border-slate-200 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none"
              >
                <img
                  src="/assets/education/shiva_avatar.png"
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentUser?.name ? currentUser.name.split(' ')[0] : 'Shiva'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs">
                  <div className="px-3 py-2.5 border-b border-stone-100 flex items-center gap-2.5">
                    <img
                      src="/assets/education/shiva_avatar.png"
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {currentUser?.name || 'Shiva Tiwari'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser?.mobile ? `+91 ${currentUser.mobile}` : 'Citizen'} • {currentUser?.taluka || 'Vav-Tharad'}
                      </p>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenComplaints();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
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
                        onNavigateToDirectory('schools');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span>Browse Schools (15)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onNavigateToDirectory('teachers');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span>Teacher Directory (40+)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onNavigateToDirectory('students');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span>Student Enrollment (5,000+)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onFileEducationComplaint();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span>File School Grievance</span>
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onBackToHome();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 cursor-pointer"
                    >
                      Return to Main District Portal
                    </button>
                    {onLogout && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold flex items-center justify-between cursor-pointer mt-1 border-t border-stone-100 pt-2"
                      >
                        <span>Log Out</span>
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        {/* Breadcrumbs: Home / Education */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#0B2545] transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-stone-200/80 text-slate-700 flex items-center justify-center">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span>Home</span>
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-[#0B2545] font-bold">Education</span>
        </div>

        {/* Two-Column Grid: Left (Main Stats & Leadership) / Right (Updates & Activities) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* ================= LEFT SECTION (Col 1-8) ================= */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top Row: 3 Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: 5,000+ Students -> Opens Directory 'students' */}
              <button
                type="button"
                onClick={() => onNavigateToDirectory('students')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all text-left overflow-hidden cursor-pointer"
              >
                {/* Background Watermark Graduation Cap */}
                <GraduationCap
                  className="absolute right-2 bottom-1 w-20 h-20 text-slate-100/70 group-hover:text-sky-100/50 transition-colors pointer-events-none"
                  strokeWidth={1}
                />

                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        5,000+
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <span className="block text-sm font-bold text-slate-800 mt-0.5">Students</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Across Vav-Tharad</span>
                  </div>
                </div>

                <div className="absolute left-0 bottom-0 w-16 h-1 bg-sky-500 rounded-tr-full" />
              </button>

              {/* Card 2: 40+ Teachers -> Opens Directory 'teachers' */}
              <button
                type="button"
                onClick={() => onNavigateToDirectory('teachers')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all text-left overflow-hidden cursor-pointer"
              >
                <Presentation
                  className="absolute right-2 bottom-1 w-20 h-20 text-slate-100/70 group-hover:text-amber-100/50 transition-colors pointer-events-none"
                  strokeWidth={1}
                />

                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Presentation className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        40+
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <span className="block text-sm font-bold text-slate-800 mt-0.5">Teachers</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Across Vav-Tharad</span>
                  </div>
                </div>

                <div className="absolute left-0 bottom-0 w-16 h-1 bg-amber-500 rounded-tr-full" />
              </button>

              {/* Card 3: 15+ Schools -> Opens Directory 'schools' */}
              <button
                type="button"
                onClick={() => onNavigateToDirectory('schools')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all text-left overflow-hidden cursor-pointer"
              >
                <Building
                  className="absolute right-2 bottom-1 w-20 h-20 text-slate-100/70 group-hover:text-emerald-100/50 transition-colors pointer-events-none"
                  strokeWidth={1}
                />

                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Building className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        15+
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <span className="block text-sm font-bold text-slate-800 mt-0.5">Schools</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Across Vav-Tharad</span>
                  </div>
                </div>

                <div className="absolute left-0 bottom-0 w-16 h-1 bg-emerald-500 rounded-tr-full" />
              </button>
            </div>

            {/* Bottom Large Container: Education Department Leadership */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs overflow-hidden">
              <Building
                className="absolute right-4 top-2 w-28 h-28 text-slate-100/60 pointer-events-none"
                strokeWidth={0.8}
              />

              {/* Leadership Header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="text-[#0B2545]">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] tracking-tight">
                    Education Department Leadership
                  </h3>
                </div>

                {/* Tricolor accent underline matching image */}
                <div className="mt-1.5 flex items-center w-28 h-[3px]">
                  <span className="w-1/3 h-full bg-[#FF9933] rounded-l-full" />
                  <span className="w-1/3 h-full bg-slate-300" />
                  <span className="w-1/3 h-full bg-[#138808] rounded-r-full" />
                </div>
              </div>

              {/* Two Officer Profile Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Officer 1: First Name / First Designation */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedOfficer({
                      name: 'First Name',
                      designation: 'First Designation',
                      image: '/assets/education/officer_male.png',
                      dept: 'District Primary Education Office, Vav-Tharad',
                      bio: 'Responsible for overall academic curriculum administration, teacher transfers, Mid-Day Meal governance, and new school infrastructure across Vav & Tharad blocks.',
                      phone: '+91 94270 54120',
                      email: 'dpeo-vavtharad@gujarat.gov.in'
                    })
                  }
                  className="group relative bg-[#F8FAFD] rounded-2xl p-6 border border-slate-100 hover:border-slate-300/80 transition-all text-center flex flex-col items-center cursor-pointer hover:shadow-xs"
                >
                  <div className="relative w-28 h-28 rounded-full bg-sky-50 p-1 mb-3 ring-2 ring-sky-100 group-hover:scale-105 transition-transform overflow-hidden shadow-xs">
                    <img
                      src="/assets/education/officer_male.png"
                      alt="First Name"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors">
                    First Name
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    First Designation
                  </p>
                  <span className="text-[11px] text-sky-600 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view profile &amp; contact →
                  </span>
                </button>

                {/* Officer 2: Second Name / Second Designation */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedOfficer({
                      name: 'Second Name',
                      designation: 'Second Designation',
                      image: '/assets/education/officer_female.png',
                      dept: 'Taluka Primary Education Inspection Wing',
                      bio: 'Leads continuous classroom pedagogical reviews, girl child enrollment campaigns, scholarship disbursements, and teacher training workshops.',
                      phone: '+91 94285 32901',
                      email: 'tpeo-inspection@gujarat.gov.in'
                    })
                  }
                  className="group relative bg-[#F8FAFD] rounded-2xl p-6 border border-slate-100 hover:border-slate-300/80 transition-all text-center flex flex-col items-center cursor-pointer hover:shadow-xs"
                >
                  <div className="relative w-28 h-28 rounded-full bg-amber-50 p-1 mb-3 ring-2 ring-amber-100 group-hover:scale-105 transition-transform overflow-hidden shadow-xs">
                    <img
                      src="/assets/education/officer_female.png"
                      alt="Second Name"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors">
                    Second Name
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Second Designation
                  </p>
                  <span className="text-[11px] text-amber-600 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view profile &amp; contact →
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SECTION (Col 9-12) ================= */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Latest Updates Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#0B2545]">
                  <Megaphone className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0B2545]">
                    Latest Updates
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllUpdates(true)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Updates List */}
              <div className="space-y-2.5">
                {updatesList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setSelectedUpdate({
                        title: item.title,
                        date: item.date,
                        statusColor: item.statusColor,
                        detail: item.detail
                      })
                    }
                    className="w-full text-left p-3 rounded-xl bg-[#F8FAFD] hover:bg-slate-100/80 border border-slate-100/90 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                        <span className={`w-2 h-2 rounded-full ${item.statusColor} inline-block ml-1`} />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0B2545] transition-colors mt-0.5 truncate">
                        {item.title}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. School Activities Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 text-[#0B2545]">
                  <Camera className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0B2545]">
                    School Activities
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllActivities(true)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Exact Photo Grid from image_32066463.png */}
              <div className="space-y-2">
                {/* Top Row: 2 images */}
                <div className="grid grid-cols-12 gap-2">
                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: schoolPhotos[0].src,
                        title: schoolPhotos[0].title,
                        desc: schoolPhotos[0].desc
                      })
                    }
                    className="col-span-7 h-24 sm:h-26 rounded-xl overflow-hidden cursor-pointer group relative shadow-2xs"
                  >
                    <img
                      src={schoolPhotos[0].src}
                      alt="Classroom activity"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Enlarge
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: schoolPhotos[1].src,
                        title: schoolPhotos[1].title,
                        desc: schoolPhotos[1].desc
                      })
                    }
                    className="col-span-5 h-24 sm:h-26 rounded-xl overflow-hidden cursor-pointer group relative shadow-2xs"
                  >
                    <img
                      src={schoolPhotos[1].src}
                      alt="School building"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Enlarge
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 3 images */}
                <div className="grid grid-cols-3 gap-2">
                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: schoolPhotos[2].src,
                        title: schoolPhotos[2].title,
                        desc: schoolPhotos[2].desc
                      })
                    }
                    className="h-20 sm:h-22 rounded-xl overflow-hidden cursor-pointer group relative shadow-2xs"
                  >
                    <img
                      src={schoolPhotos[2].src}
                      alt="Science Lab"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold bg-black/60 px-1.5 py-0.5 rounded-full">
                        Lab
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: schoolPhotos[3].src,
                        title: schoolPhotos[3].title,
                        desc: schoolPhotos[3].desc
                      })
                    }
                    className="h-20 sm:h-22 rounded-xl overflow-hidden cursor-pointer group relative shadow-2xs"
                  >
                    <img
                      src={schoolPhotos[3].src}
                      alt="School Assembly"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold bg-black/60 px-1.5 py-0.5 rounded-full">
                        Yoga
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: schoolPhotos[4].src,
                        title: schoolPhotos[4].title,
                        desc: schoolPhotos[4].desc
                      })
                    }
                    className="h-20 sm:h-22 rounded-xl overflow-hidden cursor-pointer group relative shadow-2xs"
                  >
                    <img
                      src={schoolPhotos[4].src}
                      alt="Tree Plantation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold bg-black/60 px-1.5 py-0.5 rounded-full">
                        Eco
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer Bar */}
      <footer className="w-full bg-white border-t border-stone-200/80 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Department of Education</span>
            <span>•</span>
            <span>Vav-Tharad District Administration, Gujarat</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <button
              type="button"
              onClick={onFileEducationComplaint}
              className="text-[#0B2545] font-bold hover:underline"
            >
              Report School Infrastructure Issue
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-slate-600 hover:text-slate-900"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </footer>

      {/* 4. MODALS & LIGHTBOXES */}
      {/* Lightbox for Activity Photos */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-200">
            <div className="relative max-h-[60vh] bg-stone-900 flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[60vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-slate-900">{selectedImage.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{selectedImage.desc}</p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Update */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-stone-200 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedUpdate.statusColor}`} />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {selectedUpdate.title} • {selectedUpdate.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 space-y-3">
              <h3 className="text-base font-bold text-[#0B2545]">
                Official Education Department Announcement
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedUpdate.detail}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="px-4 py-2 bg-[#0B2545] text-white rounded-xl text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Leadership Officers */}
      {selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-stone-200 p-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOfficer(null)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center -mt-4">
              <img
                src={selectedOfficer.image}
                alt={selectedOfficer.name}
                className="w-24 h-24 rounded-full mx-auto ring-4 ring-slate-100 object-cover shadow-sm"
              />
              <h3 className="text-lg font-bold text-slate-900 mt-3">{selectedOfficer.name}</h3>
              <p className="text-xs font-semibold text-slate-500">{selectedOfficer.designation}</p>
              <p className="text-[11px] text-[#0B2545] font-bold mt-0.5">{selectedOfficer.dept}</p>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 my-4 text-xs text-slate-600 text-left space-y-2">
                <p>{selectedOfficer.bio}</p>
                <div className="pt-2 border-t border-stone-200 flex flex-col gap-1 text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedOfficer.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    {selectedOfficer.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedOfficer(null);
                  onFileEducationComplaint();
                }}
                className="w-full py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Submit Grievance to this Official Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View All Updates Drawer/Modal */}
      {showAllUpdates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#0B2545]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Education Department Bulletins &amp; Updates
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAllUpdates(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-3">
              {updatesList.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-bold text-[#0B2545]">{item.title}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.subheading}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View All Activities Gallery Drawer/Modal */}
      {showAllActivities && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#0B2545]" />
                <h3 className="text-lg font-bold text-slate-900">
                  School Activities &amp; Campus Highlights
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAllActivities(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schoolPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200"
                >
                  <img src={photo.src} alt={photo.title} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <h5 className="text-xs font-bold text-slate-900">{photo.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{photo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
