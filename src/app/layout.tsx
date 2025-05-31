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

      {/* IMPORTANT: ZERO Tailwind classes on <body> */}
      <body>
        {children}
      </body>
    </html>
  );
}
