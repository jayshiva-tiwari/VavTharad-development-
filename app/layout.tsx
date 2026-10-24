import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Gujarati:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FBF9F5] text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
