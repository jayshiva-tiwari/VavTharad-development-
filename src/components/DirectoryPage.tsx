import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Home,
  ChevronRight,
  School,
  Building,
  GraduationCap,
  Presentation,
  BookOpen,
  Search,
  ArrowUpDown,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  FileText,
  ChevronDown,
  X,
  LogOut
} from 'lucide-react';
import { EmblemLogo } from './EmblemLogo';
import { UserSession } from '../types';

export type DirectoryType = 'schools' | 'teachers' | 'students';

export interface SchoolItem {
  id: string;
  name: string;
  type: 'Private School' | 'Government School';
  taluka: string;
  address: string;
  principal: string;
  phone: string;
  email: string;
  medium: string;
  grades: string;
  studentsCount: number;
  teachersCount: number;
  facilities: string[];
}

export interface TeacherItem {
  id: string;
  name: string;
  subject: string;
  type: 'Government School' | 'Private School';
  schoolName: string;
  qualification: string;
  experience: string;
  taluka: string;
  phone: string;
}

export interface StudentGradeItem {
  id: string;
  schoolName: string;
  type: 'Government School' | 'Private School';
  taluka: string;
  totalEnrolled: number;
  boys: number;
  girls: number;
  scholarshipRecipients: number;
}

export interface DirectoryPageProps {
  initialType?: DirectoryType;
  onBackToHome: () => void;
  onBackToEducation: () => void;
  onOpenComplaints: () => void;
  onFileComplaint: (deptId?: string) => void;
  onSelectSchool: (school: SchoolItem) => void;
  currentUser?: UserSession | null;
  onLogout?: () => void;
}

// 15 Schools: 8 Private + 7 Government (Exact match with "08 Private Schools" & "07 Government Schools")
export const SCHOOLS_DATA: SchoolItem[] = [
  {
    id: 'sch-1',
    name: 'National High School',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Station Road, Near Ganj Bazaar, Tharad',
    principal: 'Shri R. M. Trivedi',
    phone: '+91 2742 222140',
    email: 'contact@nationalhighschool-tharad.edu.in',
    medium: 'Gujarati & English Medium',
    grades: 'Grades 1 to 12 (Science & Commerce)',
    studentsCount: 680,
    teachersCount: 22,
    facilities: ['Smart Classrooms', 'Physics & Chemistry Labs', 'Computer Lab', 'Sports Ground', 'RO Drinking Water']
  },
  {
    id: 'sch-2',
    name: 'Success School',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Deesa Highway, Opp. Sardar Patel Complex, Tharad',
    principal: 'Smt. Anitaben K. Shah',
    phone: '+91 2742 223890',
    email: 'info@successschooltharad.org',
    medium: 'English Medium (GSEB & CBSE)',
    grades: 'Kindergarten to Grade 10',
    studentsCount: 520,
    teachersCount: 18,
    facilities: ['Digital Audio-Visual Room', 'Library', 'Activity Hall', 'Bus Transportation', 'CCTV Campus']
  },
  {
    id: 'sch-3',
    name: 'Tirupati High School',
    type: 'Private School',
    taluka: 'Vav',
    address: 'Dhima Road, Near Balaji Complex, Vav',
    principal: 'Shri Jayeshbhai D. Patel',
    phone: '+91 2740 231510',
    email: 'tirupatischoolvav@gmail.com',
    medium: 'Gujarati Medium',
    grades: 'Grades 5 to 12 (Arts & Commerce)',
    studentsCount: 460,
    teachersCount: 15,
    facilities: ['Science Laboratory', 'Computer Center', 'NCC & Scouts Unit', 'Solar Rooftop Power']
  },
  {
    id: 'sch-4',
    name: 'Sanatan High School',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Court Road, Civil Hospital Chowk, Tharad',
    principal: 'Dr. Maheshchandra Joshi',
    phone: '+91 2742 224610',
    email: 'sanatanhighschool@rediffmail.com',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 10',
    studentsCount: 410,
    teachersCount: 14,
    facilities: ['Library', 'Mid-Day Refreshments', 'Cultural Auditorium', 'Fire Safety Certified']
  },
  {
    id: 'sch-5',
    name: 'Model Primary School, Tharad',
    type: 'Government School',
    taluka: 'Tharad',
    address: 'Prathmik Shala Campus, Kasba Ward 4, Tharad',
    principal: 'Shri Vikramsinh B. Vaghela',
    phone: '+91 2742 221055',
    email: 'modelpri-tharad@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 390,
    teachersCount: 11,
    facilities: ['PM-POSHAN Kitchen', 'Gyansetu Smart TV', 'Bilingual Library', 'Rainwater Harvesting']
  },
  {
    id: 'sch-6',
    name: 'Government Kanya Shala, Vav',
    type: 'Government School',
    taluka: 'Vav',
    address: 'Fort Road, Near Historical Stepwell, Vav',
    principal: 'Smt. Ushaben M. Solanki',
    phone: '+91 2740 232115',
    email: 'kanyashala-vav@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8 (Girls School)',
    studentsCount: 340,
    teachersCount: 10,
    facilities: ['KGBV Hostel Facility', 'Self Defense Training', 'Computer Lab', 'Clean Sanitation Blocks']
  },
  {
    id: 'sch-7',
    name: 'Dhima Primary & Ashram Shala',
    type: 'Government School',
    taluka: 'Vav',
    address: 'Dharani Dhar Temple Marg, Dhima Village, Vav',
    principal: 'Shri Govindbhai H. Chaudhari',
    phone: '+91 2740 248230',
    email: 'dhimaashram-edu@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 290,
    teachersCount: 8,
    facilities: ['Residential Dormitories', 'Organic Kitchen Garden', 'Science Experiment Kits', 'Mid-Day Meal']
  },
  {
    id: 'sch-8',
    name: 'Saraswati Vidyamandir, Suigam',
    type: 'Private School',
    taluka: 'Suigam',
    address: 'Radhaness Road, Suigam Kasba',
    principal: 'Shri Bharatkumar K. Dave',
    phone: '+91 2740 255120',
    email: 'saraswati-suigam@edu.in',
    medium: 'Gujarati & Semi-English',
    grades: 'Grades 1 to 10',
    studentsCount: 310,
    teachersCount: 11,
    facilities: ['Computer Room', 'Sports Kits', 'Yoga Pavilion', 'RO Filtered Water']
  },
  {
    id: 'sch-9',
    name: 'Bhabhar Central Primary School',
    type: 'Government School',
    taluka: 'Bhabhar',
    address: 'Railway Station Road, Bhabhar',
    principal: 'Shri Pravinbhai S. Darji',
    phone: '+91 2745 233401',
    email: 'bhabharcentral-sch@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 360,
    teachersCount: 9,
    facilities: ['Digital Classrooms', 'Science Corner', 'Sports Ground', 'Mid-Day Meal Hall']
  },
  {
    id: 'sch-10',
    name: 'Shree Krishna Vidhyalaya',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Piluda Road, Tharad Rural',
    principal: 'Shri Kantilal N. Prajapati',
    phone: '+91 2742 245012',
    email: 'krishnavidhyalaya@gmail.com',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 280,
    teachersCount: 9,
    facilities: ['Spacious Classrooms', 'Bus Facility', 'Library', 'CCTV']
  },
  {
    id: 'sch-11',
    name: 'Government Primary School, Tithgam',
    type: 'Government School',
    taluka: 'Vav',
    address: 'Gram Panchayat Road, Tithgam, Vav',
    principal: 'Shri Babubhai M. Rabari',
    phone: '+91 2740 261890',
    email: 'tithgam-school@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 210,
    teachersCount: 6,
    facilities: ['Mid-Day Meal Kitchen', 'Safe Drinking Water', 'Solar Lights', 'Playground']
  },
  {
    id: 'sch-12',
    name: 'Gyan Jyoti English School',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Near Old Bus Stand, Tharad',
    principal: 'Smt. Deepaliben R. Vyas',
    phone: '+91 2742 225180',
    email: 'gyanjyoti-eng@school.org',
    medium: 'English Medium',
    grades: 'Nursery to Grade 8',
    studentsCount: 295,
    teachersCount: 12,
    facilities: ['Interactive Smartboards', 'Robotics Club', 'Music & Dance Room', 'Air-Conditioned Lab']
  },
  {
    id: 'sch-13',
    name: 'Government Secondary School, Morikha',
    type: 'Government School',
    taluka: 'Vav',
    address: 'Main Approach Road, Morikha Village, Vav',
    principal: 'Shri Dineshchandra G. Thakor',
    phone: '+91 2740 274310',
    email: 'morikha-highschool@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 9 to 12',
    studentsCount: 275,
    teachersCount: 8,
    facilities: ['Physics, Chem, Biology Lab', 'Computer Gyansetu', 'Volleyball Court', 'Free Textbooks']
  },
  {
    id: 'sch-14',
    name: 'Adarsh Vidhyalaya, Lodrani',
    type: 'Private School',
    taluka: 'Tharad',
    address: 'Lodrani Cross Road, Tharad',
    principal: 'Shri Harisinh K. Vaghela',
    phone: '+91 2742 263490',
    email: 'adarsh-lodrani@gmail.com',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 10',
    studentsCount: 240,
    teachersCount: 8,
    facilities: ['Library', 'Computer Lab', 'Purified RO Water', 'Sports Kit']
  },
  {
    id: 'sch-15',
    name: 'Government Primary School, Asara',
    type: 'Government School',
    taluka: 'Suigam',
    address: 'Border Area Main Gate, Asara, Suigam',
    principal: 'Shri Mansukhbhai P. Patel',
    phone: '+91 2740 289045',
    email: 'asara-prischool@gujgov.in',
    medium: 'Gujarati Medium',
    grades: 'Grades 1 to 8',
    studentsCount: 195,
    teachersCount: 5,
    facilities: ['Solar Drinking Water Pump', 'PM-POSHAN Hall', 'Smart Classroom TV', 'Eco Club Garden']
  }
];

export const TEACHERS_DATA: TeacherItem[] = [
  {
    id: 'tea-1',
    name: 'Shri Hasmukhbhai K. Patel',
    subject: 'Mathematics & Science',
    type: 'Government School',
    schoolName: 'Model Primary School, Tharad',
    qualification: 'M.Sc., B.Ed., State Best Teacher Awardee',
    experience: '16 Years',
    taluka: 'Tharad',
    phone: '+91 94270 41290'
  },
  {
    id: 'tea-2',
    name: 'Smt. Gitaben R. Solanki',
    subject: 'Gujarati & Sanskrit',
    type: 'Government School',
    schoolName: 'Government Kanya Shala, Vav',
    qualification: 'M.A., B.Ed., TET-II Qualified',
    experience: '12 Years',
    taluka: 'Vav',
    phone: '+91 94285 10923'
  },
  {
    id: 'tea-3',
    name: 'Shri Pravinbhai M. Suthar',
    subject: 'Computer & Information Technology',
    type: 'Private School',
    schoolName: 'National High School',
    qualification: 'BCA, MCA',
    experience: '9 Years',
    taluka: 'Tharad',
    phone: '+91 98254 78120'
  },
  {
    id: 'tea-4',
    name: 'Smt. Rekhaben D. Chaudhari',
    subject: 'Social Science & Geography',
    type: 'Government School',
    schoolName: 'Dhima Primary & Ashram Shala',
    qualification: 'M.A., M.Ed.',
    experience: '14 Years',
    taluka: 'Vav',
    phone: '+91 94291 33201'
  },
  {
    id: 'tea-5',
    name: 'Shri Nareshkumar B. Joshi',
    subject: 'English & Grammar',
    type: 'Private School',
    schoolName: 'Success School',
    qualification: 'M.A. (English), B.Ed.',
    experience: '11 Years',
    taluka: 'Tharad',
    phone: '+91 97240 88219'
  },
  {
    id: 'tea-6',
    name: 'Shri Bharatkumar S. Dave',
    subject: 'Physics & Chemistry',
    type: 'Private School',
    schoolName: 'Tirupati High School',
    qualification: 'M.Sc., B.Ed.',
    experience: '15 Years',
    taluka: 'Vav',
    phone: '+91 99042 15670'
  },
  {
    id: 'tea-7',
    name: 'Shri Vikramsinh Vaghela',
    subject: 'Physical Education & Sports',
    type: 'Government School',
    schoolName: 'Model Primary School, Tharad',
    qualification: 'B.P.Ed., Certified Yoga Instructor',
    experience: '8 Years',
    taluka: 'Tharad',
    phone: '+91 98980 44211'
  },
  {
    id: 'tea-8',
    name: 'Smt. Hansaben P. Darji',
    subject: 'Primary Language & Arts',
    type: 'Government School',
    schoolName: 'Bhabhar Central Primary School',
    qualification: 'P.T.C., B.A.',
    experience: '18 Years',
    taluka: 'Bhabhar',
    phone: '+91 94273 66109'
  }
];

export const STUDENTS_DATA: StudentGradeItem[] = [
  {
    id: 'stu-1',
    schoolName: 'National High School',
    type: 'Private School',
    taluka: 'Tharad',
    totalEnrolled: 680,
    boys: 360,
    girls: 320,
    scholarshipRecipients: 85
  },
  {
    id: 'stu-2',
    schoolName: 'Success School',
    type: 'Private School',
    taluka: 'Tharad',
    totalEnrolled: 520,
    boys: 280,
    girls: 240,
    scholarshipRecipients: 60
  },
  {
    id: 'stu-3',
    schoolName: 'Tirupati High School',
    type: 'Private School',
    taluka: 'Vav',
    totalEnrolled: 460,
    boys: 245,
    girls: 215,
    scholarshipRecipients: 72
  },
  {
    id: 'stu-4',
    schoolName: 'Model Primary School, Tharad',
    type: 'Government School',
    taluka: 'Tharad',
    totalEnrolled: 390,
    boys: 195,
    girls: 195,
    scholarshipRecipients: 190
  },
  {
    id: 'stu-5',
    schoolName: 'Government Kanya Shala, Vav',
    type: 'Government School',
    taluka: 'Vav',
    totalEnrolled: 340,
    boys: 0,
    girls: 340,
    scholarshipRecipients: 340
  },
  {
    id: 'stu-6',
    schoolName: 'Dhima Primary & Ashram Shala',
    type: 'Government School',
    taluka: 'Vav',
    totalEnrolled: 290,
    boys: 155,
    girls: 135,
    scholarshipRecipients: 290
  },
  {
    id: 'stu-7',
    schoolName: 'Bhabhar Central Primary School',
    type: 'Government School',
    taluka: 'Bhabhar',
    totalEnrolled: 360,
    boys: 190,
    girls: 170,
    scholarshipRecipients: 210
  }
];

export function DirectoryPage({
  initialType = 'schools',
  onBackToHome,
  onBackToEducation,
  onOpenComplaints,
  onFileComplaint,
  onSelectSchool,
  currentUser,
  onLogout
}: DirectoryPageProps) {
  const [activeTab, setActiveTab] = useState<DirectoryType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'govt-first' | 'private-first'>('default');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [selectedStudentGrade, setSelectedStudentGrade] = useState<StudentGradeItem | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'private' | 'government'>('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtered schools
  const filteredSchools = useMemo(() => {
    let list = SCHOOLS_DATA.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.taluka.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType =
        filterType === 'all'
          ? true
          : filterType === 'private'
          ? s.type === 'Private School'
          : s.type === 'Government School';
      return matchSearch && matchType;
    });

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'govt-first') {
      list.sort((a, b) => (a.type === 'Government School' ? -1 : 1));
    } else if (sortBy === 'private-first') {
      list.sort((a, b) => (a.type === 'Private School' ? -1 : 1));
    }
    return list;
  }, [searchQuery, filterType, sortBy]);

  const getSchoolColor = (index: number) => {
    const palette = [
      { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'ring-sky-100' },
      { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
      { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
      { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-100' }
    ];
    return palette[index % palette.length];
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F7FC]/80 text-slate-900">
      {/* 1. Header with Vav-Tharad branding matching image_791c570a.png */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Emblem of India and Vav-Tharad branding */}
          <EmblemLogo href="/" />

          {/* Right: "Your Complaints" button and "Shiva" user profile */}
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

            {/* User Profile Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 sm:pr-2.5 py-1 bg-white hover:bg-stone-50 border border-slate-200 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none active:scale-95"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs sm:text-sm ring-1 ring-blue-200">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 hidden xs:inline">
                  {currentUser?.name ? currentUser.name.split(' ')[0] : 'Shiva'}
                </span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown (Desktop) */}
              {showProfileMenu && (
                <>
                  <div
                    className="hidden sm:block fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                    aria-hidden="true"
                  />
                  <div className="hidden sm:block absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-stone-100 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                      </div>
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
                          onFileComplaint('education');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 cursor-pointer"
                      >
                        <span>Report School Issue</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileMenu(false);
                          onBackToEducation();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 cursor-pointer"
                      >
                        Back to Education Overview
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content with School Campus Background & Flag Wave */}
      <main className="relative flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-[76px] sm:pt-[84px] pb-6 space-y-5 sm:space-y-6">
        {/* Top-Right Background: Wavy Indian Flag Ribbon + School Campus Building */}
        <div className="absolute top-2 right-4 sm:right-8 w-60 sm:w-80 md:w-[460px] h-28 sm:h-36 md:h-44 pointer-events-none opacity-20 sm:opacity-35 md:opacity-40 overflow-hidden select-none -z-0">
          <img
            src="/assets/education/schools_header_campus.png"
            alt="School Campus"
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
          <span className="text-[#0052CC] font-bold capitalize shrink-0">
            {activeTab}
          </span>
        </div>

        {/* Quick Tabs to toggle between Schools, Teachers, and Students */}
        <div className="relative z-10 flex items-center gap-2 border-b border-stone-200/80 pb-2.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('schools')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'schools'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Schools (15)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'teachers'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Teachers (40+)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
              activeTab === 'students'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Students (5,000+)</span>
          </button>
        </div>

        {/* Header Title Section with KPI Cards (Exact match of image_791c570a.png) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-end">
          {/* Left: Headline & Subtitle */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0B2545] tracking-tight leading-tight">
              {activeTab === 'schools' && 'Schools in Vav-Tharad'}
              {activeTab === 'teachers' && 'Teachers in Vav-Tharad'}
              {activeTab === 'students' && 'Students in Vav-Tharad'}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">
              {activeTab === 'schools' && 'Find government and private schools across the region.'}
              {activeTab === 'teachers' && 'Find certified government and private school educators across the region.'}
              {activeTab === 'students' && 'Find student enrollment and demographic distribution across the region.'}
            </p>

            {/* Search Input Box with Navy Search Button */}
            <div className="pt-1">
              <div className="relative flex items-center bg-white rounded-2xl p-1.5 pl-3.5 sm:pl-5 border border-stone-200 shadow-xs focus-within:ring-2 focus-within:ring-[#0B2545]/40 focus-within:border-[#0B2545]">
                <Search className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === 'schools'
                      ? 'Search schools by name...'
                      : activeTab === 'teachers'
                      ? 'Search teachers by name or subject...'
                      : 'Search student enrollment records...'
                  }
                  className="w-full bg-transparent text-sm sm:text-[15px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#0B2545] hover:bg-[#071c35] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Two KPI Cards matching image_791c570a.png */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-4">
            {activeTab === 'schools' ? (
              <>
                {/* Card 1: 08 Private Schools */}
                <div
                  onClick={() => setFilterType(filterType === 'private' ? 'all' : 'private')}
                  className={`bg-white rounded-2xl p-3 sm:p-5 border transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2.5 sm:gap-3.5 ${
                    filterType === 'private' ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-100'
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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

                {/* Card 2: 07 Government Schools */}
                <div
                  onClick={() => setFilterType(filterType === 'government' ? 'all' : 'government')}
                  className={`bg-white rounded-2xl p-3 sm:p-5 border transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2.5 sm:gap-3.5 ${
                    filterType === 'government' ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-100'
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
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
              </>
            ) : activeTab === 'teachers' ? (
              <>
                <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Presentation className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                      25+
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                      Govt Educators
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">TET-II Qualified</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                      15+
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                      Private Teachers
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">Subject Experts</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                      2,840
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                      Primary (1-5)
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">Boys &amp; Girls</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none block">
                      2,160
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                      Upper Primary
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-400 truncate">Grades 6 to 8</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Directory Section Container matching image_791c570a.png */}
        <div className="relative z-10 bg-white rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-xs space-y-4">
          {/* Header of Directory */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'schools' && 'School Directory'}
                  {activeTab === 'teachers' && 'Teacher Directory'}
                  {activeTab === 'students' && 'Student Enrollment Directory'}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeTab === 'schools' && `${filteredSchools.length} Institutions Registered in Vav-Tharad`}
                  {activeTab === 'teachers' && `${TEACHERS_DATA.length} Active Teaching Staff Members`}
                  {activeTab === 'students' && `${STUDENTS_DATA.length} School Cohort Reports`}
                </p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowSortDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-stone-50 hover:bg-stone-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-stone-200 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                <span>
                  {sortBy === 'default' && 'Sort By'}
                  {sortBy === 'name-asc' && 'Name (A to Z)'}
                  {sortBy === 'govt-first' && 'Govt First'}
                  {sortBy === 'private-first' && 'Private First'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 p-1.5 z-40 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy('default');
                      setShowSortDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 text-slate-700 font-medium"
                  >
                    Default Order
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy('name-asc');
                      setShowSortDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 text-slate-700 font-medium"
                  >
                    Name (A to Z)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy('govt-first');
                      setShowSortDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 text-slate-700 font-medium"
                  >
                    Government First
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy('private-first');
                      setShowSortDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 text-slate-700 font-medium"
                  >
                    Private First
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* List Rows */}
          {activeTab === 'schools' && (
            <div className="space-y-2.5">
              {filteredSchools.map((school, index) => {
                const color = getSchoolColor(index);
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => onSelectSchool(school)}
                    className="w-full text-left p-3 sm:p-4 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between gap-3 sm:gap-4 group cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <School className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                        <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#0B2545] transition-colors truncate">
                          {school.name}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold self-start sm:self-auto shrink-0 ${
                            school.type === 'Private School'
                              ? 'bg-sky-50 text-sky-700 border border-sky-100'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}
                        >
                          {school.type}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="space-y-2.5">
              {TEACHERS_DATA.map((teacher, index) => {
                const color = getSchoolColor(index);
                return (
                  <button
                    key={teacher.id}
                    type="button"
                    onClick={() => setSelectedTeacher(teacher)}
                    className="w-full text-left p-3 sm:p-4 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between gap-3 sm:gap-4 group cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <Presentation className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#0B2545] transition-colors truncate">
                            {teacher.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {teacher.subject}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {teacher.schoolName} • {teacher.taluka} Taluka
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-2.5">
              {STUDENTS_DATA.map((record, index) => {
                const color = getSchoolColor(index);
                return (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => setSelectedStudentGrade(record)}
                    className="w-full text-left p-3 sm:p-4 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between gap-3 sm:gap-4 group cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#0B2545] transition-colors truncate">
                            {record.schoolName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-bold">
                            {record.totalEnrolled} Students
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          Boys: {record.boys} • Girls: {record.girls} • {record.taluka}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer Bar */}
      <footer className="w-full bg-white border-t border-stone-200/80 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">District Education Officer</span>
            <span>•</span>
            <span>Vav-Tharad District Administration, Government of Gujarat</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-600">
            <button
              type="button"
              onClick={() => onFileComplaint('education')}
              className="text-[#0B2545] font-bold hover:underline"
            >
              Report School Issue
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onBackToEducation}
              className="text-slate-600 hover:text-slate-900"
            >
              Back to Education Overview
            </button>
          </div>
        </div>
      </footer>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[11px] font-bold">
                  {selectedTeacher.subject}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{selectedTeacher.name}</h3>
                <p className="text-xs text-slate-500">{selectedTeacher.schoolName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-50 p-3.5 sm:p-4 rounded-2xl my-4 text-xs space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Qualification:</span>
                <span className="font-bold text-slate-900">{selectedTeacher.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="font-bold text-slate-900">{selectedTeacher.experience}</span>
              </div>
              <div className="flex justify-between">
                <span>Taluka:</span>
                <span className="font-bold text-slate-900">{selectedTeacher.taluka}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 bg-[#0B2545] text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Cohort Detail Modal */}
      {selectedStudentGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                  Enrollment Statistics
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {selectedStudentGrade.schoolName}
                </h3>
                <p className="text-xs text-slate-500">{selectedStudentGrade.taluka} Taluka</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentGrade(null)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-slate-400 block">Total Students</span>
                <span className="text-base font-bold text-slate-900">
                  {selectedStudentGrade.totalEnrolled}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-slate-400 block">Scholarships</span>
                <span className="text-base font-bold text-emerald-700">
                  {selectedStudentGrade.scholarshipRecipients}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-slate-400 block">Boys</span>
                <span className="text-base font-bold text-slate-900">
                  {selectedStudentGrade.boys}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-slate-400 block">Girls</span>
                <span className="text-base font-bold text-slate-900">
                  {selectedStudentGrade.girls}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudentGrade(null)}
                className="px-4 py-2 bg-[#0B2545] text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer for User Profile (Rendered via portal into document.body) */}
      {mounted && showProfileMenu && createPortal(
        <div className="fixed inset-0 z-50 sm:hidden flex items-end justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setShowProfileMenu(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-h-[85dvh] overflow-y-auto bg-white rounded-t-3xl shadow-2xl border-t border-stone-200 p-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] animate-in slide-in-from-bottom duration-250">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg ring-2 ring-blue-200">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 text-base truncate">
                  {currentUser?.name || 'Shiva Tiwari'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {currentUser?.mobile ? `+91 ${currentUser.mobile}` : 'Citizen'} • {currentUser?.taluka || 'Vav-Tharad'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileMenu(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 tap-feedback active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-1.5 text-sm">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenComplaints();
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl hover:bg-stone-50 font-semibold text-slate-800 flex items-center justify-between border border-slate-100 tap-feedback active:scale-98"
              >
                <span>Track Active Grievances</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  3
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onFileComplaint('education');
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold flex items-center justify-between border border-amber-200/60 tap-feedback active:scale-98"
              >
                <span>Report School Issue</span>
                <ChevronRight className="w-4 h-4 text-orange-500" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onBackToEducation();
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl hover:bg-stone-50 font-semibold text-slate-700 flex items-center justify-between border border-slate-100 tap-feedback active:scale-98"
              >
                <span>Back to Education Overview</span>
                <Home className="w-4 h-4 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onBackToHome();
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl hover:bg-stone-50 font-semibold text-slate-700 flex items-center justify-between border border-slate-100 tap-feedback active:scale-98"
              >
                <span>Main District Portal</span>
                <Home className="w-4 h-4 text-slate-400" />
              </button>
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold flex items-center justify-between border border-rose-100 tap-feedback active:scale-98"
                >
                  <span>Log Out</span>
                  <LogOut className="w-4 h-4 text-rose-500" />
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
