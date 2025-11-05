"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import GiftIcon from "../icons/GiftIcon";
import EmailIcon from "../icons/EmailIcon";
import MusicIcon from "../icons/MusicIcon";
import { usePathname } from "next/navigation";
import MenuIcon from "../icons/MenuIcon";
import GridIcon from "../icons/GridIcon";
import { useTimezoneView } from "@/app/context/TimezoneViewContext";
import { useInterval } from "@/app/hooks/useInterval";
import { DateTime } from "luxon";
const TTopBar = () => {
  const pathname = usePathname();
  const { view, toggleView } = useTimezoneView();
  const [localTime, setLocalTime] = React.useState("");
  // const [zone, setZone] = React.useState("");
  const [is24Hour, setIs24Hour] = React.useState(false);

  const pageTitle =
    pathname === "/"
      ? "Home"
      : pathname
          ?.split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ")
          ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Page";

  const isTimezonePage = pathname === "/timezones";

  const updateTime = React.useCallback(() => {
    const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = DateTime.now().setZone(zoneName);
    const format = is24Hour ? "HH : mm" : "hh : mm a";
    setLocalTime(now.toFormat(format));
  }, [is24Hour]);

  React.useEffect(() => {
    updateTime();
  }, [updateTime]);

  useInterval(updateTime, 1000);

  return (
    <header className="flex items-center justify-between pl-3 border-b border-zinc-800 bg-zinc-900 text-zinc-200">
      <div className="flex items-center gap-2">
        <Menu className="lg:hidden cursor-pointer" />
        <h1 className="text-sm text-zinc-500">{pageTitle}</h1>
        <span className="text-zinc-500">/</span>
        <button className="text-xs font-normal text-yellow-600 tracking-wide cursor-pointer flex gap-2 items-center hover:bg-yellow-500 hover:text-zinc-900 py-0.5 px-1.5 rounded">
          <GiftIcon size={14} />
          Login / Sign Up for more
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant={"ghost"}>
          <EmailIcon size={13} />
          Feedback
        </Button>
        <Button variant={"ghost"}>
          <MusicIcon size={13} />
          Focus
        </Button>
        <p className="font-normal text-sm text-zinc-200">
          {" "}
          {localTime.split(":")[0]}
          <span className="blink-colon">:</span>
          {localTime.split(":")[1]}
        </p>
        <div className="flex gap-0 items-center bg-zinc-800 ">
          <Button
            variant={"ghost"}
            className="hover:bg-zinc-700"
            onClick={() => setIs24Hour((prev) => !prev)}
          >
            {is24Hour ? "24 hr" : "12 hr"}
          </Button>
          {isTimezonePage && (
            <Button
              variant={"ghost"}
              onClick={toggleView}
              className="hover:bg-zinc-500"
            >
              {view === "layout1" ? (
                <MenuIcon size={18} className="text-zinc-200" />
              ) : (
                <GridIcon size={18} className="text-zinc-200" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TTopBar;
