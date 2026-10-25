'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EducationPage } from '@/src/components/EducationPage';
import { UserSession } from '@/src/types';

export default function NextEducationPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  return (
    <EducationPage
      onBackToHome={() => router.push('/')}
      onOpenComplaints={() => router.push('/#tracker')}
      onFileEducationComplaint={() => router.push('/#complaint')}
      onNavigateToDirectory={(type) => router.push(`/education/${type}`)}
      currentUser={currentUser}
      onLogout={() => setCurrentUser(null)}
    />
  );
}
