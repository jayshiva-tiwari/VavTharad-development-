import { NextResponse } from 'next/server';
import { INITIAL_COMPLAINTS } from '@/src/data/mockData';
import { Complaint, DepartmentId } from '@/src/types';

// In-memory store for complaints in Next.js App Router backend
let complaintsStore: Complaint[] = [...INITIAL_COMPLAINTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const found = complaintsStore.find(
      (c) => c.id.toLowerCase() === id.toLowerCase()
    );
    if (!found) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }
    return NextResponse.json(found);
  }

  return NextResponse.json({
    total: complaintsStore.length,
    complaints: complaintsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.subject || !body.departmentId || !body.citizenName || !body.citizenMobile) {
      return NextResponse.json(
        { error: 'Missing required fields: subject, departmentId, citizenName, citizenMobile' },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `VT-2026-${randomSuffix}`;

    const newComplaint: Complaint = {
      id: newId,
      departmentId: body.departmentId as DepartmentId,
      departmentName: body.departmentName || 'Public Grievance Department',
      subject: body.subject,
      description: body.description || '',
      taluka: body.taluka || 'Tharad',
      village: body.village || 'Tharad Town',
      citizenName: body.citizenName,
      citizenMobile: body.citizenMobile,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      priority: body.priority || 'Normal',
      assignedOfficer: {
        name: 'District Nodal Officer',
        designation: 'Resident Deputy Collector',
        phone: '02740-222001',
        office: 'Collectorate, Vav-Tharad',
      },
      timeline: [
        {
          status: 'Submitted',
          date: new Date().toISOString().split('T')[0],
          title: 'Grievance Registered',
          titleGu: 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
          description: 'Grievance lodged on official district portal.',
          descriptionGu: 'વાવ-થરાદ જાહેર ફરિયાદ નિવારણ પોર્ટલ પર નોંધણી થઈ.',
          completed: true,
          current: true,
        },
      ],
    };

    complaintsStore.unshift(newComplaint);

    return NextResponse.json(
      {
        success: true,
        complaint: newComplaint,
        message: 'Complaint submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON request payload' },
      { status: 400 }
    );
  }
}
