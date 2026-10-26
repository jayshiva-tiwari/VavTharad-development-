'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EducationPage } from '@/src/components/EducationPage';
import { StatusTrackerModal } from '@/src/components/StatusTrackerModal';
import { ComplaintModal } from '@/src/components/ComplaintModal';
import { Complaint, UserSession } from '@/src/types';
import { INITIAL_COMPLAINTS } from '@/src/data/mockData';

const DEFAULT_SHIVA_SESSION: UserSession = {
  name: 'Shiva Tiwari',
  mobile: '9876543210',
  taluka: 'Tharad',
  role: 'citizen',
  isLoggedIn: true,
};

export default function NextEducationPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEFAULT_SHIVA_SESSION);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);

  return (
    <>
      <EducationPage
        onBackToHome={() => router.push('/')}
        onOpenComplaints={() => setIsTrackerOpen(true)}
        onFileEducationComplaint={() => setIsComplaintOpen(true)}
        onNavigateToDirectory={(type) => router.push(`/education/${type}`)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      <StatusTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        isGujarati={false}
        complaints={complaints}
      />

      <ComplaintModal
        isOpen={isComplaintOpen}
        onClose={() => setIsComplaintOpen(false)}
        isGujarati={false}
        initialDepartmentId="education"
        currentUser={currentUser}
        onComplaintSubmitted={(c) => setComplaints((prev) => [c, ...prev])}
      />
    </>
  );
}
