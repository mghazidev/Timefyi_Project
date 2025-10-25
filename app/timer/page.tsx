'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Home, Play, Pause, RotateCcw } from 'lucide-react';

export default function TimerPage() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Complete!', {
          body: 'Your countdown has finished.',
        });
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (isEditing) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(totalSeconds);
      setIsEditing(false);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsEditing(true);
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
    };
  };

  const displayTime = formatTime(timeLeft);
  const totalTime = hours * 3600 + minutes * 60 + seconds;
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

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
              <span className="text-white font-medium px-3 py-1.5 rounded bg-zinc-900">Timer</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 mb-8">
            {isEditing ? (
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="text-center">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="w-24 text-7xl font-light bg-transparent text-center border-b-2 border-zinc-700 focus:border-yellow-500 outline-none"
                  />
                  <p className="text-gray-500 text-sm mt-2">hours</p>
                </div>
                <span className="text-7xl font-light">:</span>
                <div className="text-center">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-24 text-7xl font-light bg-transparent text-center border-b-2 border-zinc-700 focus:border-yellow-500 outline-none"
                  />
                  <p className="text-gray-500 text-sm mt-2">minutes</p>
                </div>
                <span className="text-7xl font-light">:</span>
                <div className="text-center">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-24 text-7xl font-light bg-transparent text-center border-b-2 border-zinc-700 focus:border-yellow-500 outline-none"
                  />
                  <p className="text-gray-500 text-sm mt-2">seconds</p>
                </div>
              </div>
            ) : (
              <div className="mb-8">
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
                      stroke="#eab308"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 90}`}
                      strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl font-light">
                        {displayTime.hours}:{displayTime.minutes}:{displayTime.seconds}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  disabled={isEditing && hours === 0 && minutes === 0 && seconds === 0}
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-6 h-6 ml-1" />
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Pause className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={resetTimer}
                className="w-16 h-16 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
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
