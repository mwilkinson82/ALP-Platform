// src/app/(app)/hub/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import animationData from '@/app/animations/animation1.json';
import UpcomingIntensivesCalendar from '@/components/UpcomingIntensivesCalendar';

export default function HubPage() {
  const [showSplash, setShowSplash] = useState(true);
  const session = useSession();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [session, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading…
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      {showSplash ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            style={{ width: '60%', maxWidth: 400 }}
          />
        </div>
      ) : (
        <div className="w-screen h-screen bg-white flex flex-col">
          <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">ALP Hub</h1>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/auth');
              }}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </header>

          <div className="flex flex-1">
            <aside className="hidden md:block w-64 bg-gray-100 p-4 space-y-2">
              <button
                onClick={() => router.push('/hub')}
                className="block w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/hub/history')}
                className="block w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                History
              </button>
              <button
                onClick={() => router.push('/hub/services')}
                className="block w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                Services
              </button>
            </aside>

            <main className="flex-1 p-6 relative">
              <div className="absolute top-4 right-4">
                <UpcomingIntensivesCalendar />
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Welcome, <span className="font-medium">{user?.email}</span>!
                </p>
              </div>

              <div className="bg-white shadow rounded p-4">
                <p>This is your Hub dashboard area.</p>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
