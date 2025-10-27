import WorldIcon from "../icons/world";
import { TCategoryCardProps } from "../types";
import TCategoryCard from "../TCategoryCard";
import BellIcon from "../icons/BellIcon";
import ClockIcon from "../icons/ClockIcon";
import DailyPlannerIcon from "../icons/DailyPlannerIcon";
import PomodoroIcon from "../icons/PomodoroIcon";
import StopwatchIcon from "../icons/StopwatchIcon";

const catData: TCategoryCardProps[] = [
  {
    icon: <WorldIcon size={30} className="text-zinc-300" />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <PomodoroIcon size={30} className="text-zinc-300" />,
    title: "Pomodoro",
    description: "Boost productivity with timed work sessions",
  },
  {
    icon: <DailyPlannerIcon size={30} className="text-zinc-300" />,
    title: "Daily Planner",
    description: "Plan your days and weeks to stay organized",
  },
  {
    icon: <ClockIcon size={30} className="text-zinc-300" />,
    title: "World Clock",
    description: "Check current time anywhere in the world",
  },
  {
    icon: <BellIcon size={30} className="text-zinc-300" />,
    title: "Timer",
    description: "Set countdowns with alarm for any task",
  },
  {
    icon: <StopwatchIcon size={30} className="text-zinc-300" />,
    title: "Stopwatch",
    description: "Measure elapsed time precisely",
  },
];

const CategorySelectionSection = () => {
  return (
    <section className="p-3 md:px-8 bg-black w-full my-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto">
        {catData.map((cat, index) => (
          <TCategoryCard
            key={index}
            icon={cat.icon}
            title={cat.title}
            description={cat.description}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySelectionSection;
