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

  // If session becomes null/client-side, redirect back to /auth
  useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [session, router]);

  // Show Lottie animation for 2 seconds, then show Hub UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // While session is still undefined (loading), show a loading screen
  if (session === undefined) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }

  return (
    // Outer wrapper full-screen (white background)
    <div className="min-h-screen bg-white">
      {showSplash ? (
        // Splash screen (Lottie)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            style={{ width: '60%', maxWidth: 400 }}
          />
        </div>
      ) : (
        // Main Hub content
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header */}
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
            {/* Sidebar (visible on md+ screens) */}
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

            {/* Main content area */}
            <main className="flex-1 p-6 relative">
              {/* Upcoming Intensives Card in top-right */}
              <div className="absolute top-4 right-4">
                <UpcomingIntensivesCalendar />
              </div>

              {/* Welcome message */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Welcome, <span className="font-medium">{user?.email}</span>!
                </p>
              </div>

              {/* Placeholder Dashboard Box */}
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
