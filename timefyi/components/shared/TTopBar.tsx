import { Bell, User, Menu } from "lucide-react";
import { Button } from "../ui/button";

interface TTopBarProps {
  title?: string;
}

const TTopBar: React.FC<TTopBarProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-6 py-1 border-b border-zinc-800 bg-zinc-950 text-zinc-200">
      <div className="flex items-center gap-3">
        <Menu className="lg:hidden cursor-pointer" />
        <h1 className="text-lg font-semibold">{title}</h1>
        <Button>Login / Sign Up for more</Button>
      </div>

      <div className="flex items-center gap-6">
        <button className="hover:text-yellow-400">
          <Bell size={20} />
        </button>
        <button className="flex items-center gap-2 hover:text-yellow-400">
          <User size={20} />
          <span className="hidden md:inline">Login / Sign Up</span>
        </button>
      </div>
    </header>
  );
};

export default TTopBar;
