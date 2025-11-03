"use client";

import React from "react";
import PlusIcon from "../icons/PlusIcon";
import CrossIcon from "../icons/CrossIcon";
import GlobeIcon from "../icons/GlobeIcon";
import { DateTime } from "luxon";
import { timezoneData, TimezoneData } from "@/lib/timezoneData";

interface TAddNewTimezoneCardProps {
  defaultSearchMode?: boolean;
}

interface Timezone {
  label: string;
  zone: string;
}

const TAddNewTimezoneCard: React.FC<TAddNewTimezoneCardProps> = ({
  defaultSearchMode = false,
}) => {
  const [isSearchMode, setIsSearchMode] = React.useState(defaultSearchMode);
  const [timezones, setTimezones] = React.useState<Timezone[]>([
    {
      label: "Local Time",
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  ]);
  const [newZone, setNewZone] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<TimezoneData[]>([]);

  // handle search filtering
  React.useEffect(() => {
    if (!newZone.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = timezoneData.filter(
      (t) =>
        t.country.toLowerCase().includes(newZone.toLowerCase()) ||
        t.city.toLowerCase().includes(newZone.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 8));
  }, [newZone]);

  const handleSelectTimezone = (zone: string) => {
    try {
      const time = DateTime.now().setZone(zone);
      if (!time.isValid) throw new Error("Invalid timezone");

      setTimezones([...timezones, { label: zone, zone }]);
      setNewZone("");
      setIsSearchMode(false);
      setSuggestions([]);
    } catch {
      alert("Invalid timezone name! Example: Asia/Karachi");
    }
  };

  const formatOffset = (zone: string) => {
    const offset = DateTime.now().setZone(zone).offset; // minutes
    const hours = Math.floor(offset / 60);
    const minutes = Math.abs(offset % 60);
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${String(Math.abs(hours)).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
  };

  const formatLabel = (city: string, country: string) => {
    return `${city}, ${country}`;
  };
  return (
    <button
      onClick={() => !isSearchMode && setIsSearchMode(true)}
      className="relative flex w-full cursor-pointer min-h-[220px] flex-col items-center justify-center rounded-md bg-zinc-900 p-4 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 sm:min-h-[217px]"
    >
      {!isSearchMode && (
        <>
          <PlusIcon size={28} />
          <p className="mt-1">Add Timezone</p>
        </>
      )}

      {isSearchMode && (
        <div className="absolute top-0 left-0 right-0 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <GlobeIcon size={18} className="text-zinc-500" />

            <div className="flex-1 mx-2">
              <div className="relative">
                <input
                  type="text"
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  placeholder="Timezone, city, or country"
                  className="w-full text-base text-zinc-200 outline-none placeholder-zinc-500 bg-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchMode(false);
                setNewZone("");
                setSuggestions([]);
              }}
              className="p-1 text-zinc-500 hover:text-zinc-200 transition cursor-pointer"
            >
              <CrossIcon size={18} />
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-2 max-h-[140px] overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              {suggestions.map(({ city, country, zone }) => {
                const offset = formatOffset(zone);
                const label = formatLabel(city, country);
                const key = `${zone}::${city.replace(/\s+/g, "_")}`;
                return (
                  <div
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTimezone(zone);
                    }}
                    className="flex items-center   gap-2 px-3 py-1 hover:bg-zinc-700 cursor-pointer text-zinc-500 transition rounded-md"
                  >
                    <span className="text-xs bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md">
                      {offset}
                    </span>
                    <span className="text-sm text-zinc-500 truncate">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default TAddNewTimezoneCard;
