import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Vav-Tharad District Portal | વાવ-થરાદ જિલ્લા પોર્ટલ',
  description: 'Official District Administration & Grievance Redressal Portal, District Education Department, Vav-Tharad, Gujarat.',
  openGraph: {
    title: 'Vav-Tharad District Administration Portal',
    description: 'Public grievance registration, school directory, teacher & student portals for Vav-Tharad District.',
    url: 'https://vav-tharad.gujarat.gov.in',
    siteName: 'Vav-Tharad District Portal',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBF9F5] text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
