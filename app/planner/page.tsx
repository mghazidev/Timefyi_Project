'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Home, Plus, Check, X } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
}

interface DaySchedule {
  date: string;
  tasks: Task[];
}

export default function PlannerPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      date: '2025-10-25',
      tasks: [
        { id: '1', text: 'Morning meeting', completed: false, time: '09:00' },
        { id: '2', text: 'Review project proposals', completed: true, time: '11:00' },
        { id: '3', text: 'Lunch break', completed: false, time: '13:00' },
        { id: '4', text: 'Team standup', completed: false, time: '15:00' },
      ],
    },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        time: newTaskTime || undefined,
      };
      setSchedule([
        {
          ...schedule[0],
          tasks: [...schedule[0].tasks, newTask],
        },
      ]);
      setNewTaskText('');
      setNewTaskTime('');
    }
  };

  const toggleTask = (taskId: string) => {
    setSchedule([
      {
        ...schedule[0],
        tasks: schedule[0].tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      },
    ]);
  };

  const deleteTask = (taskId: string) => {
    setSchedule([
      {
        ...schedule[0],
        tasks: schedule[0].tasks.filter((task) => task.id !== taskId),
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
                Daily Planner
              </span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{formatDate(schedule[0].date)}</h2>
            <p className="text-gray-400">
              {schedule[0].tasks.filter((t) => t.completed).length} of {schedule[0].tasks.length}{' '}
              tasks completed
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
            <div className="flex gap-4">
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <button
                onClick={addTask}
                className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg px-6 py-3 font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {schedule[0].tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4 hover:bg-zinc-800 transition-colors ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-zinc-600 hover:border-yellow-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {task.time && (
                  <span className="text-yellow-500 font-mono text-sm w-16">{task.time}</span>
                )}

                <span
                  className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}

            {schedule[0].tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No tasks yet. Add your first task above!</p>
              </div>
            )}
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
