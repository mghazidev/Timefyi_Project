'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Home, Play, Pause, RotateCcw, Settings } from 'lucide-react';

type PomodoroMode = 'work' | 'short' | 'long';

export default function PomodoroPage() {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const durations = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'work') {
        setSessions((prev) => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const handleModeChange = (newMode: PomodoroMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

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
                Pomodoro
              </span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => handleModeChange('work')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                mode === 'work'
                  ? 'bg-red-500 text-white'
                  : 'bg-zinc-900 text-gray-400 hover:text-white'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => handleModeChange('short')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                mode === 'short'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-900 text-gray-400 hover:text-white'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => handleModeChange('long')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                mode === 'long'
                  ? 'bg-green-500 text-white'
                  : 'bg-zinc-900 text-gray-400 hover:text-white'
              }`}
            >
              Long Break
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 mb-8">
            <div className="relative mb-8">
              <svg className="w-full" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={mode === 'work' ? '#ef4444' : mode === 'short' ? '#3b82f6' : '#22c55e'}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-light">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={toggleTimer}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button
                onClick={resetTimer}
                className="w-16 h-16 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Sessions completed: <span className="text-white font-semibold">{sessions}</span>
            </p>
          </div>
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
