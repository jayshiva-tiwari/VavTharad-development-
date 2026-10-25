import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Vav-Tharad District Grievance & Citizen Portal',
  description: 'Official citizen grievance redressal and public service platform for Vav-Tharad district, Government of Gujarat.',
  other: {
    'darkreader-lock': 'darkreader-lock',
  },
  openGraph: {
    title: 'Vav-Tharad District Grievance & Citizen Portal',
    description: 'Official citizen grievance redressal and public service platform for Vav-Tharad district, Government of Gujarat.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="darkreader-lock" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FBF9F5] text-slate-800 antialiased selection:bg-orange-500 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
