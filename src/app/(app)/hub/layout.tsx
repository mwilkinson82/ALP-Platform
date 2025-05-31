// src/app/(app)/hub/layout.tsx
import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function HubLayout({ children }: { children: React.ReactNode }) {
  // Create Supabase client on server:
  const supabaseServer = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) {
    // If no session, send to /auth
    redirect('/auth');
  }

  // Just render children—DO NOT render <body> or <html> here.
  return <>{children}</>;
}
