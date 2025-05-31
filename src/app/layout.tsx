// src/app/layout.tsx
import Head from 'next/head';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ALP Hub</title>
      </Head>
      {/* 
        Add `antialiased` here so the server and client body classNames match exactly.
        We also include "min-h-screen bg-white" so Tailwind’s precomputed classes match.
      */}
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
