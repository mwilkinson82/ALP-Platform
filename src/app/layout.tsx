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
        Notice: NO className on <body> at all. 
        We will move “min-h-screen bg-white” into a wrapper DIV inside children.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}
