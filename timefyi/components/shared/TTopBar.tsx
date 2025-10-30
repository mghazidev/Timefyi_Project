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
const TTopBar = () => {
  const pathname = usePathname();
  const { view, toggleView } = useTimezoneView();
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
          03 : 36<span className="text-zinc-500"> PM</span>
        </p>
        <div className="flex gap-0 items-center bg-zinc-800">
          <Button variant={"ghost"}>12 hr</Button>
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
