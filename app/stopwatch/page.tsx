'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Home, Play, Pause, RotateCcw, Flag } from 'lucide-react';

interface Lap {
  id: number;
  time: number;
  lapTime: number;
}

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    setLastLapTime(0);
  };

  const recordLap = () => {
    const lapTime = time - lastLapTime;
    setLaps([{ id: laps.length + 1, time, lapTime }, ...laps]);
    setLastLapTime(time);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
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
                Stopwatch
              </span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 mb-8">
            <div className="text-center mb-8">
              <span className="text-8xl font-light">{formatTime(time)}</span>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={toggleTimer}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button
                onClick={recordLap}
                disabled={!isRunning && time === 0}
                className="w-16 h-16 bg-yellow-500 text-black rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Flag className="w-6 h-6" />
              </button>
              <button
                onClick={resetTimer}
                className="w-16 h-16 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {laps.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Laps</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {laps.map((lap) => (
                  <div
                    key={lap.id}
                    className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg"
                  >
                    <span className="text-gray-400">Lap {lap.id}</span>
                    <div className="flex gap-8">
                      <span className="text-gray-400">+{formatTime(lap.lapTime)}</span>
                      <span className="font-mono">{formatTime(lap.time)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
