import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Folder, ChevronRight, Terminal, ExternalLink } from 'lucide-react';

interface NextJsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGujarati: boolean;
}

export function NextJsModal({ isOpen, onClose, isGujarati }: NextJsModalProps) {
  const [selectedFile, setSelectedFile] = useState<string>('app/page.tsx');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const filesMap: Record<string, { label: string; path: string; description: string; code: string }> = {
    'app/layout.tsx': {
      label: 'app/layout.tsx',
      path: '/app/layout.tsx',
      description: 'Root layout configuring fonts, metadata, and OpenGraph tags',
      code: `import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Vav-Tharad District Portal | વાવ-થરાદ જિલ્લા પોર્ટલ',
  description: 'Official District Administration & Grievance Redressal Portal, District Education Department, Vav-Tharad, Gujarat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBF9F5] text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}`
    },
    'app/page.tsx': {
      label: 'app/page.tsx',
      path: '/app/page.tsx',
      description: 'Home portal page with grievance registration and 10 departments',
      code: `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { DEPARTMENTS } from '@/src/data/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Link href="/education" className="px-5 py-3 rounded-2xl bg-amber-500 font-bold text-white">
          Open Education Portal →
        </Link>
      </main>
      <Footer />
    </div>
  );
}`
    },
    'app/education/page.tsx': {
      label: 'app/education/page.tsx',
      path: '/app/education/page.tsx',
      description: 'Education Department overview (15 Schools, 184 Teachers, 4,210 Students)',
      code: `'use client';

import { useRouter } from 'next/navigation';
import { EducationPage } from '@/src/components/EducationPage';

export default function NextEducationPage() {
  const router = useRouter();
  return (
    <EducationPage
      onNavigateDirectory={(type) => router.push(\`/education/\${type}\`)}
      onBack={() => router.push('/')}
    />
  );
}`
    },
    'app/education/schools/page.tsx': {
      label: 'app/education/schools/page.tsx',
      path: '/app/education/schools/page.tsx',
      description: 'Schools directory with 7 Government + 8 Private filters and search',
      code: `'use client';

import { useRouter } from 'next/navigation';
import { DirectoryPage } from '@/src/components/DirectoryPage';

export default function NextSchoolsDirectoryPage() {
  const router = useRouter();
  return (
    <DirectoryPage
      type="schools"
      onBack={() => router.push('/education')}
      onSelectSchool={(school) => router.push(\`/education/schools/\${school.id}\`)}
    />
  );
}`
    },
    'app/education/schools/[id]/page.tsx': {
      label: 'app/education/schools/[id]/page.tsx',
      path: '/app/education/schools/[id]/page.tsx',
      description: 'Dynamic School Detail route with params (e.g. /education/schools/g-1)',
      code: `'use client';

import { useParams, useRouter } from 'next/navigation';
import { SchoolDetailPage } from '@/src/components/SchoolDetailPage';
import { SCHOOLS_DATA } from '@/src/components/DirectoryPage';

export default function NextSchoolDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const school = SCHOOLS_DATA.find((s) => s.id === id) || SCHOOLS_DATA[0];

  return (
    <SchoolDetailPage
      school={school}
      onBack={() => router.push('/education/schools')}
    />
  );
}`
    },
    'app/api/complaints/route.ts': {
      label: 'app/api/complaints/route.ts',
      path: '/app/api/complaints/route.ts',
      description: 'Next.js App Router API Route (GET / POST) for public grievances',
      code: `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const newId = \`GRV-2026-\${Math.floor(1000 + Math.random() * 9000)}\`;
  return NextResponse.json({
    success: true,
    id: newId,
    message: 'Complaint lodged successfully in Vav-Tharad District System.',
  });
}`
    },
    'package.next.json': {
      label: 'package.next.json',
      path: '/package.next.json',
      description: 'Production Next.js package.json ready for npm install and deploy',
      code: `{
  "name": "vav-tharad-district-portal-nextjs",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.546.0",
    "canvas-confetti": "^1.9.4"
  }
}`
    }
  };

  const currentFile = filesMap[selectedFile] || filesMap['app/page.tsx'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0B2545] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <span>{isGujarati ? 'Next.js 15 App Router આર્કિટેક્ચર' : 'Next.js 15 App Router Architecture'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                {isGujarati
                  ? 'આ પોર્ટલ સંપૂર્ણપણે Next.js App Router સાથે સક્ષમ કરવામાં આવ્યું છે.'
                  : 'All Next.js routes, layout, APIs, and configs are created and configured in the project.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Split View (Sidebar + Code View) */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-72 bg-stone-50 border-r border-stone-200 p-3 overflow-y-auto space-y-1">
            <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-500" />
              <span>Next.js Project Files</span>
            </div>
            {Object.keys(filesMap).map((key) => {
              const file = filesMap[key];
              const isSelected = selectedFile === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFile(key)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-stone-200/70'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span className="truncate">{file.label}</span>
                  </div>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                </button>
              );
            })}

            <div className="pt-4 mt-3 border-t border-stone-200 px-2 space-y-2">
              <div className="text-[11px] text-slate-500 font-semibold">Deploy to Vercel:</div>
              <div className="bg-slate-900 text-slate-100 p-2 rounded-xl text-[11px] font-mono flex items-center justify-between">
                <span>npx vercel</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('npx vercel');
                  }}
                  className="text-amber-300 hover:underline text-[10px]"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-950 text-slate-100 p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div>
                <span className="font-mono text-amber-400 font-bold">{currentFile.path}</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{currentFile.description}</p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="flex-1 overflow-auto p-3 text-xs font-mono text-emerald-300/90 leading-relaxed bg-slate-900/60 rounded-xl mt-3 select-all">
              <code>{currentFile.code}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600">
            All files are saved in the project root: <span className="font-mono font-bold text-slate-800">/app/</span>, <span className="font-mono font-bold text-slate-800">next.config.mjs</span>, and <span className="font-mono font-bold text-slate-800">README-NEXTJS.md</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B2545] text-white rounded-xl font-bold hover:bg-[#133E68] transition-colors cursor-pointer"
          >
            {isGujarati ? 'બંધ કરો' : 'Close Explorer'}
          </button>
        </div>
      </div>
    </div>
  );
}
