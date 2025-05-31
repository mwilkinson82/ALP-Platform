// src/components/UpcomingIntensivesCalendar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Intensives } from '@/types/supabase';

export default function UpcomingIntensivesCalendar() {
  const [intensives, setIntensives] = useState<Intensives[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIntensives() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Intensives>('intensives')
        .select('id, title, start_time')
        .order('start_time', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Error loading intensives:', error);
      } else {
        setIntensives(data ?? []);
      }
      setLoading(false);
    }
    loadIntensives();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-white/80 rounded shadow">
        Loading…
      </div>
    );
  }

  if (intensives.length === 0) {
    return (
      <div className="p-4 bg-white/80 rounded shadow">
        <p className="text-gray-600">No upcoming intensives.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-[20px] shadow w-72 max-h-80 overflow-y-auto">
      <h3 className="font-semibold text-gray-700 mb-2">Upcoming Intensives</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {intensives.map((item) => (
          <li key={item.id} className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0">
            <p className="font-medium">{item.title}</p>
            <p>{new Date(item.start_time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
