// src/app/(app)/layout.tsx
import Head from 'next/head';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>ALP Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* 
        Wrap everything in a div instead of <body>.
        Include `antialiased` so Tailwind’s variable-based styles match on client and server.
      */}
      <div className="min-h-screen bg-white antialiased">
        {children}
      </div>
    </>
  );
}
