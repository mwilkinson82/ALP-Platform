// src/app/(app)/hub/layout.tsx
import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function HubLayout({ children }: { children: React.ReactNode }) {
  const supabaseServer = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  // NO <body> or <html> here—just render children
  return <>{children}</>;
}
