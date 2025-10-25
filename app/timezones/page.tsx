'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Home, Plus, Edit2, Trash2 } from 'lucide-react';

interface TimezoneData {
  id: string;
  city: string;
  timezone: string;
}

export default function TimezonesPage() {
  const [timezones, setTimezones] = useState<TimezoneData[]>([
    { id: '1', city: 'Lahore, Pakistan', timezone: 'Asia/Karachi' },
    { id: '2', city: 'London, United Kingdom', timezone: 'Europe/London' },
    { id: '3', city: 'Munich, Germany', timezone: 'Europe/Berlin' },
    { id: '4', city: 'Karachi, Pakistan', timezone: 'Asia/Karachi' },
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
      hour12: false,
    });
  };

  const getDateInTimezone = (timezone: string) => {
    return new Date().toLocaleDateString('en-US', {
      timeZone: timezone,
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimezoneOffset = (timezone: string) => {
    const now = new Date();
    const tzString = now.toLocaleString('en-US', { timeZone: timezone });
    const tzDate = new Date(tzString);
    const offset = (tzDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return Math.round(offset);
  };

  const getHourPosition = (timezone: string) => {
    const time = new Date().toLocaleString('en-US', { timeZone: timezone });
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return ((hours + minutes / 60) / 24) * 100;
  };

  const removeTimezone = (id: string) => {
    setTimezones(timezones.filter((tz) => tz.id !== id));
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
                Timezones
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">04:45 PM</span>
            <span className="text-gray-400 text-sm">12hr</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {timezones.map((tz) => {
            const offset = getTimezoneOffset(tz.timezone);
            const offsetSign = offset >= 0 ? '+' : '';
            const [hours, minutes] = getTimeInTimezone(tz.timezone).split(':');

            return (
              <div
                key={tz.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative group"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeTimezone(tz.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-300 text-sm mb-1">{tz.city}</h3>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-light">{hours}</span>
                  <span className="text-5xl font-light">:</span>
                  <span className="text-5xl font-light">{minutes}</span>
                  <span className="text-gray-400 text-lg ml-1">PM</span>
                  {offset !== 0 && (
                    <span className="text-red-500 text-sm ml-2">
                      {offsetSign}
                      {offset}h
                    </span>
                  )}
                </div>

                <div className="text-gray-500 text-xs mb-4">
                  GMT{offsetSign}5 · {getDateInTimezone(tz.timezone)}
                </div>

                <div className="relative h-12 bg-zinc-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 border-r border-zinc-700 ${
                          i >= 6 && i < 18 ? 'bg-zinc-700' : 'bg-zinc-900'
                        }`}
                      />
                    ))}
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white"
                    style={{ left: `${getHourPosition(tz.timezone)}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-black" />
                  </div>
                  <div className="absolute bottom-1 left-1 right-1 flex justify-between text-[8px] text-gray-500 font-mono">
                    <span>00</span>
                    <span>06</span>
                    <span>12</span>
                    <span>18</span>
                    <span>24</span>
                  </div>
                </div>
              </div>
            );
          })}

          <button className="bg-zinc-900 border border-zinc-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors min-h-[280px]">
            <Plus className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-400">Add Timezone</span>
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
