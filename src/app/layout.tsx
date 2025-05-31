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
        We do NOT put Tailwind classes directly on <body> to avoid hydration mismatches.
        Any full‐screen styling goes inside a wrapping <div> in your pages/components.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}
