import TList from "../shared/TList";
import WorldIcon from "../icons/world";

const listData = [
  {
    icon: <WorldIcon />,
    title: "Timezones for Teams and Individuals",
    description:
      "Compare timezones globally. Save favorites. Collaborate with team members. DST-aware.",
  },
  {
    icon: <WorldIcon />,
    title: "Support for Workspaces and Projects",
    description:
      "Organize your tasks and projects in workspaces. Use Pomodoros and Daily Planner on your tasks.",
  },
  {
    icon: <WorldIcon />,
    title: "Stay productive with Pomodoros",
    description:
      "Customizable work/break intervals. Track productivity. Notifications and alerts.",
  },
  {
    icon: <WorldIcon />,
    title: "Plan your days with daily planner",
    description:
      "Manage tasks and schedules. Recurring tasks. Quick entry. Pomodoro integration.",
  },
  {
    icon: <WorldIcon />,
    title: "Timer to set countdowns and alarms",
    description:
      "Set countdowns for any activity. Sound alerts and notifications.",
  },
  {
    icon: <WorldIcon />,
    title: "Stopwatch to track activities",
    description: "Track elapsed time. Start, stop, and reset functionality.",
  },
  {
    icon: <WorldIcon />,
    title: "More tools coming soon",
    description: "Additional time and productivity tools in development.",
  },
];

const MainPageListSection = () => {
  return (
    <section className="max-w-full p-3 bg-black">
      <div>
        {listData.map((list, index) => (
          <TList
            key={index}
            icon={list.icon}
            title={list.title}
            description={list.description}
          />
        ))}
      </div>
    </section>
  );
};

export default MainPageListSection;
