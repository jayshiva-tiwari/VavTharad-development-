'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SchoolDetailPage } from '@/src/components/SchoolDetailPage';
import { SCHOOLS_DATA, SchoolItem } from '@/src/components/DirectoryPage';
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

export default function NextSchoolDetailPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEFAULT_SHIVA_SESSION);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintDept, setComplaintDept] = useState<string>('education');
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);

  const matchedSchool: SchoolItem =
    SCHOOLS_DATA.find((s) => s.id === schoolId) || SCHOOLS_DATA[0];

  return (
    <>
      <SchoolDetailPage
        school={matchedSchool}
        allSchools={SCHOOLS_DATA}
        onSelectSchool={(s) => router.push(`/education/schools/${s.id}`)}
        onBackToHome={() => router.push('/')}
        onBackToEducation={() => router.push('/education')}
        onBackToSchools={() => router.push('/education/schools')}
        onOpenComplaints={() => setIsTrackerOpen(true)}
        onFileComplaint={(schoolName) => {
          setComplaintDept('education');
          setIsComplaintOpen(true);
        }}
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
