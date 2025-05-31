// src/app/layout.tsx
import Head from 'next/head';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1) We put all full-screen/bg-white classes on <html> so it matches both server and client.
    <html lang="en" className="min-h-screen bg-white antialiased">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ALP Hub</title>
      </Head>

      {/* 2) Render <body> with NO className at all */}
      <body>{children}</body>
    </html>
  );
}
