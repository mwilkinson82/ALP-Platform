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
        IMPORTANT: We do NOT put any className on <body>.
        All full-screen/Tailwind styling moves inside the page wrappers.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}
