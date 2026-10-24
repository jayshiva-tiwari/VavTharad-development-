# Vav-Tharad District Administration Portal — Next.js 15 Edition

Official Public Grievance Redressal and District Education System for Vav-Tharad District, Gujarat.

## Architecture

This application is built with the **Next.js 15 App Router** using TypeScript and Tailwind CSS.

### App Router Directory Map

```text
├── app/
│   ├── layout.tsx                     # Global Root Layout (Fonts, Metadata, OpenGraph)
│   ├── globals.css                    # Tailwind CSS v4 styling
│   ├── page.tsx                       # District Home Portal & Grievance Desk
│   ├── education/
│   │   ├── page.tsx                   # Education Department Overview (15 schools, 184 teachers)
│   │   ├── schools/
│   │   │   ├── page.tsx               # Schools Directory (7 Govt + 8 Private filters & search)
│   │   │   └── [id]/page.tsx          # Dynamic School Detail Route (e.g. /education/schools/g-1)
│   │   ├── teachers/
│   │   │   └── page.tsx               # District Faculty Directory & search
│   │   └── students/
│   │       └── page.tsx               # District Student Roster & Grade filters
│   └── api/
│       ├── complaints/route.ts        # GET & POST Grievance Route Handler
│       └── auth/route.ts              # OTP Verification & Session Route Handler
├── src/
│   ├── components/                    # Reusable React components
│   ├── data/                          # 15 Schools, Faculty, and District datasets
│   └── types/                         # TypeScript interfaces
├── next.config.mjs                    # Next.js production configuration
└── package.next.json                  # Next.js package.json
```

## Quick Start (Running Locally with Next.js)

1. Clone or download the repository.
2. Replace `package.json` with `package.next.json`:
   ```bash
   cp package.next.json package.json
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 1-Click Deploy to Vercel

```bash
npx vercel
```
Or push to GitHub and import directly into the [Vercel Dashboard](https://vercel.com/new).
