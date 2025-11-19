"use client";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import RotateIcon from "@/components/icons/RotateIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import TAddNewTimezoneCard from "../shared/TAddNewTimezoneCard";
import { UserTimezone } from "../types";

type TimezonePageGridLayoutProps = {
  onAddTimezone: (tz: UserTimezone) => void;
  timezones: any[];
  onDeleteTimezone: (id: string) => void;
};

const TimezonePageGridLayout: React.FC<TimezonePageGridLayoutProps> = ({
  onAddTimezone,
  timezones,
  onDeleteTimezone,
}) => {
  const [activeTimezoneId, setActiveTimezoneId] = React.useState<string | null>(
    timezones.find((t) => t.isDefault)?.id ?? timezones[0]?.id ?? null
  );

  const [sliderValue, setSliderValue] = React.useState<number>(0);

  const activeTimezone =
    timezones.find((tz) => tz.id === activeTimezoneId) ?? timezones[0];

  const getTimeInTimezone = (offset: number, sliderMinutes: number = 0) => {
    const now = new Date();
    const utc = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    );
    const timeInMs = utc.getTime() + (offset * 60 + sliderMinutes) * 60 * 1000;
    return new Date(timeInMs);
  };

  const timeInActiveTz = getTimeInTimezone(activeTimezone.offset, sliderValue);

  const hours12Active = ((timeInActiveTz.getUTCHours() + 11) % 12) + 1;
  const minutesActive = timeInActiveTz
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const ampmActive = timeInActiveTz.getUTCHours() >= 12 ? "PM" : "AM";
  const dateStringActive = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(timeInActiveTz);

  return (
    <div className="h-[100%] w-full grid gap-3 grid-cols-[2.5fr_1fr]">
      <div className="relative flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 py-14 transition-all lg:flex-grow lg:p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-base text-gray-400 lg:mb-2 lg:text-xl">
              {activeTimezone.city}, {activeTimezone.country}
            </h2>
            {sliderValue !== 0 && (
              <Button
                variant={"danger"}
                className="text-sm font-medium"
                onClick={() => setSliderValue(0)}
              >
                <RotateIcon size={18} />
                RESET TO NOW
              </Button>
            )}
          </div>
          <p className="my-2.5 font-mono text-5xl font-semibold  md:text-7xl lg:text-9xl">
            <span className="">
              {hours12Active.toString().padStart(2, "0")}
            </span>
            <span className="mx-0.5 font-serif font-medium blink-colon">:</span>
            <span className="">{minutesActive}</span>
            <span className="ml-2 font-sans text-2xl font-medium text-neutral-600">
              {ampmActive}
            </span>
          </p>
          <div>
            <p className="mt-1 border-b border-dashed border-zinc-700 pb-0.5 text-base text-gray-400 transition-colors hover:text-gray-300 hover:border-zinc-500 lg:mt-2 lg:text-xl relative z-[20] cursor-pointer">
              {dateStringActive}
            </p>
          </div>
          <div className="w-full flex justify-center mt-16">
            <Slider
              defaultValue={[0]}
              value={[sliderValue]}
              min={-720}
              max={720}
              step={1}
              onValueChange={(val) => setSliderValue(val[0])}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="bg-zinc-900  rounded-2xl border border-zinc-800">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-zinc-500 my-3 w-full text-sm hover:text-zinc-200 cursor-pointer flex items-center justify-center gap-2">
              <PlusIcon size={17} />
              ADD CITY, COUNTRY, OR TIMEZONE
            </button>
          </DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="bg-zinc-900 border border-zinc-800 max-w-lg"
          >
            <DialogTitle hidden></DialogTitle>
            <TAddNewTimezoneCard
              onAddTimezone={onAddTimezone}
              defaultSearchMode
            />
          </DialogContent>
        </Dialog>

        <div>
          {timezones.map((tz) => {
            const defaultTz =
              timezones.find((t) => t.isDefault) ?? timezones[0];
            const diffHours = Math.round(tz.offset - defaultTz.offset);
            const diffSign = diffHours >= 0 ? "+" : "-";
            const diffAbs = Math.abs(diffHours);

            const nowTz = getTimeInTimezone(tz.offset, sliderValue);
            const hours12Tz = ((nowTz.getUTCHours() + 11) % 12) + 1;
            const minutesTz = nowTz.getUTCMinutes().toString().padStart(2, "0");
            const ampmTz = nowTz.getUTCHours() >= 12 ? "PM" : "AM";

            const isActive = tz.id === activeTimezoneId;
            return (
              <button
                key={tz.id}
                onClick={() => setActiveTimezoneId(tz.id)}
                className={`flex w-full items-center justify-between cursor-pointer p-2 transition-colors
                    ${isActive ? "bg-zinc-700" : "bg-zinc-900"}`}
              >
                <div className="flex items-center gap-2 ">
                  {timezones.length > 1 && (
                    <span
                      className="text-zinc-400 hover:text-red-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTimezone(tz.id);
                        if (activeTimezoneId === tz.id)
                          setActiveTimezoneId(null);
                      }}
                    >
                      <TrashIcon size={17} />
                    </span>
                  )}
                  <p className="text-zinc-400">
                    {tz.city}, {tz.country}
                  </p>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 font-mono text-sm text-zinc-50 sm:text-base">
                    <span className="rounded-full bg-zinc-800 px-2 text-sm lg:text-xs xl:text-sm py-1 !text-xs text-red-500">
                      {diffSign}
                      {diffAbs}h
                    </span>
                    <span className="ml-0.5 flex text-base sm:text-lg">
                      <span>{hours12Tz.toString().padStart(2, "0")}</span>
                      <span className="mx-0.5 font-sans blink-colon">:</span>
                      <span>{minutesTz}</span>
                      <span className="ml-1 inline-block w-[31px] font-sans font-medium text-zinc-500">
                        {ampmTz}
                      </span>
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimezonePageGridLayout;
