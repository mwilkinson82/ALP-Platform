// src/app/(app)/hub/layout.tsx
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function HubLayout({ children }: { children: React.ReactNode }) {
  const supabaseServer = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  // Only render children—do NOT render <body> or <html> here
  return <>{children}</>;
}
