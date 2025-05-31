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
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </>
  );
}
