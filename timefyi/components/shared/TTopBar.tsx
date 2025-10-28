import { Bell, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import GiftIcon from "../icons/GiftIcon";
import EmailIcon from "../icons/EmailIcon";
import MusicIcon from "../icons/MusicIcon";
interface TTopBarProps {
  title?: string;
}

const TTopBar: React.FC<TTopBarProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-3 border-b border-zinc-800 bg-zinc-900 text-zinc-200">
      <div className="flex items-center gap-2">
        <Menu className="lg:hidden cursor-pointer" />
        <h1 className="text-sm text-zinc-500">Timezones</h1>
        <span className="text-zinc-500">/</span>
        <button className="text-xs font-normal text-yellow-600 tracking-wide flex gap-2 items-center hover:bg-yellow-500 hover:text-zinc-900 py-0.5 px-1.5 rounded">
          <GiftIcon size={14} />
          Login / Sign Up for more
        </button>
      </div>

      <div>
        <Button variant={"ghost"}>
          <EmailIcon size={13} />
          Feedback
        </Button>
        <Button variant={"ghost"}>
          <MusicIcon size={13} />
          Focus
        </Button>
      </div>
    </header>
  );
};

export default TTopBar;
