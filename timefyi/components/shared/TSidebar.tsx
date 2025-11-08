"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WorldIcon from "../icons/world";
import PomodoroIcon from "../icons/PomodoroIcon";
import DailyPlannerIcon from "../icons/DailyPlannerIcon";
import ClockIcon from "../icons/ClockIcon";
import BellIcon from "../icons/BellIcon";
import StopwatchIcon from "../icons/StopwatchIcon";

const sidebarItems = [
  { label: "Timezones", icon: <WorldIcon size={20} />, href: "/timezones" },
  { label: "Pomodoro", icon: <PomodoroIcon size={20} />, href: "/pomodoro" },
  {
    label: "Daily Planner",
    icon: <DailyPlannerIcon size={20} />,
    href: "/planner",
  },
  { label: "World Time", icon: <ClockIcon size={20} />, href: "/worldtime" },
  { label: "Timer", icon: <BellIcon size={20} />, href: "/timer" },
  { label: "Stopwatch", icon: <StopwatchIcon size={20} />, href: "/stopwatch" },
];

const TSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  4;

  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setIsCollapsed(saved === "true");
  }, []);

  React.useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  return (
    <aside
      className={`bg-zinc-900 text-zinc-200 border-r border-zinc-800 h-screen flex flex-col `}
    >
      <div className="flex items-center px-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-zinc-500 bg-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 p-1 mt-4 rounded-lg cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 mt-3 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className="relative group ">
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-[3px] bg-yellow-400 rounded-r-md" />
              )}

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-1 transition-all duration-200 z-10   ${
                  isActive
                    ? "text-yellow-300"
                    : " text-zinc-700 hover:text-zinc-300"
                }`}
              >
                <div className="relative group flex justify-center">
                  {item.icon}
                  {isCollapsed && (
                    <span className="absolute z-10 left-full ml-2 bg-zinc-500 text-xs font-medium text-zinc-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 pointer-events-none">
                      {item.label}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <span className="whitespace-nowrap text-sm font-medium z-10">
                    {item.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default TSidebar;
