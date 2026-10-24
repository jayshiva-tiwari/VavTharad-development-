'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EducationPage } from '@/src/components/EducationPage';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { UserSession } from '@/src/types';

export default function NextEducationPage() {
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
        <EducationPage
          onBackToHome={() => router.push('/')}
          onOpenComplaints={() => router.push('/#tracker')}
          onFileEducationComplaint={() => router.push('/#complaint')}
          onNavigateToDirectory={(type) => router.push(`/education/${type}`)}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      </main>

      <Footer isGujarati={isGujarati} />
    </div>
  );
}
