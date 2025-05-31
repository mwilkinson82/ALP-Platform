// src/app/(app)/hub/layout.tsx
import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function HubLayout({ children }: { children: React.ReactNode }) {
  // Create a Supabase client on the server and check the user’s session
  const supabaseServer = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) {
    // If not signed in, redirect to /auth
    redirect('/auth');
  }

  // Only render the children. Do NOT render <html> or <body> here.
  return <>{children}</>;
}
