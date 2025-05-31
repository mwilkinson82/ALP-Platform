// src/app/(app)/auth/page.tsx
'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'user' } },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert('Check your email to confirm your account.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/hub');
    }
  };

  return (
    // Full-screen gray background wrapper
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In / Sign Up</h2>
        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
