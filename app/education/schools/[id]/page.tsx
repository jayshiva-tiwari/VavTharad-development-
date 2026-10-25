'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SchoolDetailPage } from '@/src/components/SchoolDetailPage';
import { SCHOOLS_DATA, SchoolItem } from '@/src/components/DirectoryPage';
import { UserSession } from '@/src/types';

export default function NextSchoolDetailPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  const matchedSchool: SchoolItem =
    SCHOOLS_DATA.find((s) => s.id === schoolId) || SCHOOLS_DATA[0];

  return (
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
  );
}
