'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DirectoryPage } from '@/src/components/DirectoryPage';
import { UserSession } from '@/src/types';

export default function NextTeachersDirectoryPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  return (
    <DirectoryPage
      initialType="teachers"
      onBackToHome={() => router.push('/')}
      onBackToEducation={() => router.push('/education')}
      onOpenComplaints={() => router.push('/#tracker')}
      onFileComplaint={() => router.push('/#complaint')}
      onSelectSchool={(school) => router.push(`/education/schools/${school.id}`)}
      currentUser={currentUser}
      onLogout={() => setCurrentUser(null)}
    />
  );
}
