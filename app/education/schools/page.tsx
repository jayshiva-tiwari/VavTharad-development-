'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DirectoryPage, SchoolItem } from '@/src/components/DirectoryPage';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { UserSession } from '@/src/types';

export default function NextSchoolsDirectoryPage() {
  const router = useRouter();
  const [isGujarati, setIsGujarati] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

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
        <DirectoryPage
          initialType="schools"
          onBackToHome={() => router.push('/')}
          onBackToEducation={() => router.push('/education')}
          onOpenComplaints={() => router.push('/#tracker')}
          onFileComplaint={() => router.push('/#complaint')}
          onSelectSchool={(school: SchoolItem) => router.push(`/education/schools/${school.id}`)}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      </main>

      <Footer isGujarati={isGujarati} />
    </div>
  );
}
