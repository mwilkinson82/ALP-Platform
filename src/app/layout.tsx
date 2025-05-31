// src/app/layout.tsx
import Head from 'next/head';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ALP Hub</title>
      </Head>
      {/* Next.js will inject its own <body> with Tailwind’s “variable” classes */}
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
