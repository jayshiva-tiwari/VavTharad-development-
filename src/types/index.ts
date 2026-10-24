export type DepartmentId =
  | 'drinking-water'
  | 'health'
  | 'agriculture'
  | 'animal-husbandry'
  | 'complaint-officials'
  | 'panchayat'
  | 'development-works'
  | 'cleanliness'
  | 'education'
  | 'anganwadi';

export type TalukaName = 'Tharad' | 'Vav' | 'Suigam' | 'Bhabhar';

export interface DepartmentService {
  id: DepartmentId;
  name: string;
  nameGu: string;
  category: string;
  helpline: string;
  headOfficer: string;
  avgResolutionDays: number;
  description: string;
  descriptionGu: string;
  commonIssues: string[];
}

export type ComplaintStatus = 'Submitted' | 'Officer Assigned' | 'Site Inspection' | 'In Progress' | 'Resolved';

export interface TimelineEvent {
  status: ComplaintStatus;
  date: string;
  title: string;
  titleGu: string;
  description: string;
  descriptionGu: string;
  officer?: string;
  completed: boolean;
  current?: boolean;
}

export interface Complaint {
  id: string; // e.g. "VT-2026-8942"
  departmentId: DepartmentId;
  departmentName: string;
  subject: string;
  description: string;
  taluka: TalukaName;
  village: string;
  citizenName: string;
  citizenMobile: string;
  createdAt: string;
  status: ComplaintStatus;
  priority: 'Normal' | 'Urgent' | 'Emergency';
  assignedOfficer: {
    name: string;
    designation: string;
    phone: string;
    office: string;
  };
  timeline: TimelineEvent[];
  attachmentName?: string;
  resolutionRemarks?: string;
}
