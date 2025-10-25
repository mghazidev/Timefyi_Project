import Link from 'next/link';
import { Clock, Globe, Timer, Bell, CalendarDays, Hourglass } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'Timezones',
      description: 'Convert time across different zones',
      icon: Clock,
      href: '/timezones',
    },
    {
      title: 'Pomodoro',
      description: 'Boost productivity with timed work sessions',
      icon: Timer,
      href: '/pomodoro',
    },
    {
      title: 'Daily Planner',
      description: 'Plan your days and weeks to stay organized',
      icon: CalendarDays,
      href: '/planner',
    },
    {
      title: 'World Clock',
      description: 'Check current time anywhere in the world',
      icon: Globe,
      href: '/world-clock',
    },
    {
      title: 'Timer',
      description: 'Set countdowns with alarm for any task',
      icon: Bell,
      href: '/timer',
    },
    {
      title: 'Stopwatch',
      description: 'Measure elapsed time precisely',
      icon: Hourglass,
      href: '/stopwatch',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4">time.fyi</h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Time related tools to help you stay productive and organized
          </p>

          <Link
            href="/timezones"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Start App
          </Link>

          <p className="text-gray-500 text-sm mt-4">No sign-up required</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-xl transition-all duration-200 border border-zinc-800 hover:border-zinc-700"
            >
              <div className="flex flex-col items-center text-center">
                <tool.icon className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
