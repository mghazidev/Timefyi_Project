'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Home, Plus } from 'lucide-react';

interface WorldCity {
  id: string;
  city: string;
  country: string;
  timezone: string;
}

export default function WorldClockPage() {
  const [cities] = useState<WorldCity[]>([
    { id: '1', city: 'New York', country: 'United States', timezone: 'America/New_York' },
    { id: '2', city: 'London', country: 'United Kingdom', timezone: 'Europe/London' },
    { id: '3', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
    { id: '4', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
    { id: '5', city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
    { id: '6', city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (timezone: string) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getDateInTimezone = (timezone: string) => {
    return new Date().toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-yellow-500">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">time.fyi</span>
            </Link>
            <nav className="flex items-center gap-1">
              <span className="text-white font-medium px-3 py-1.5 rounded bg-zinc-900">
                World Clock
              </span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800 transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{city.city}</h3>
                <p className="text-gray-400 text-sm">{city.country}</p>
              </div>
              <div className="mb-2">
                <p className="text-4xl font-light">{getTimeInTimezone(city.timezone)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{getDateInTimezone(city.timezone)}</p>
              </div>
            </div>
          ))}

          <button className="bg-zinc-900 border border-zinc-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors min-h-[180px]">
            <Plus className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-400">Add City</span>
          </button>
        </div>
      </div>

      <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-4 bg-zinc-900 rounded-r-xl border-r border-t border-b border-zinc-800">
        <Link
          href="/"
          className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
        >
          <Home className="w-5 h-5 text-black" />
        </Link>
      </div>
    </div>
  );
}
