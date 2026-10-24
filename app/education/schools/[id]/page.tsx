'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SchoolDetailPage } from '@/src/components/SchoolDetailPage';
import { SCHOOLS_DATA, SchoolItem } from '@/src/components/DirectoryPage';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { UserSession } from '@/src/types';

export default function NextSchoolDetailPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;
  const [isGujarati, setIsGujarati] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  const matchedSchool: SchoolItem =
    SCHOOLS_DATA.find((s) => s.id === schoolId) || SCHOOLS_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-800 antialiased font-sans">
      <Header
        isGujarati={isGujarati}
        onToggleLanguage={() => setIsGujarati(!isGujarati)}
        onOpenAuth={() => {}}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <SchoolDetailPage
          school={matchedSchool}
          allSchools={SCHOOLS_DATA}
          onSelectSchool={(s) => router.push(`/education/schools/${s.id}`)}
          onBackToHome={() => router.push('/')}
          onBackToEducation={() => router.push('/education')}
          onBackToSchools={() => router.push('/education/schools')}
          onOpenComplaints={() => router.push('/#tracker')}
          onFileComplaint={() => router.push('/#complaint')}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      </main>

      <Footer isGujarati={isGujarati} />
    </div>
  );
}
