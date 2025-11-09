"use client";

import React from "react";
import PlusIcon from "../icons/PlusIcon";
import CrossIcon from "../icons/CrossIcon";
import GlobeIcon from "../icons/GlobeIcon";
import { DateTime } from "luxon";
import { timezoneData, TimezoneData } from "@/lib/timezoneData";
import Fuse from "fuse.js";
import Input from "../ui/input";
type TAddNewTimezoneCardProps = {
  onAddTimezone: (tz: { id: string; name: string; offset: number }) => void;
  defaultSearchMode?: boolean;
};

const TAddNewTimezoneCard: React.FC<TAddNewTimezoneCardProps> = ({
  onAddTimezone,
  defaultSearchMode = false,
}) => {
  const [isSearchMode, setIsSearchMode] = React.useState(defaultSearchMode);
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<TimezoneData[]>([]);

  React.useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fuse = new Fuse(timezoneData, {
      keys: ["city", "country", "zone"],
      threshold: 0.3,
    });

    const results = fuse.search(query);
    setSuggestions(results.slice(0, 8).map((r) => r.item));
  }, [query]);

  const formatOffset = (zone: string) => {
    const offsetMinutes = DateTime.now().setZone(zone).offset; // minutes
    const offsetHours = offsetMinutes / 60;
    return offsetHours;
  };

  const handleSelectTimezone = (
    city: string,
    country: string,
    zone: string
  ) => {
    const offset = formatOffset(zone);
    onAddTimezone({
      id: `${zone}-${Date.now()}`,
      name: `${city}, ${country}`,
      offset,
    });
    setQuery("");
    setIsSearchMode(false);
    setSuggestions([]);
  };

  return (
    <button
      onClick={() => !isSearchMode && setIsSearchMode(true)}
      className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-zinc-900 p-4 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 sm:min-h-[210px]"
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
              {/* <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Timezone, city, or country"
                  className="w-full text-base text-zinc-200 outline-none placeholder-zinc-500 bg-transparent"
                  autoFocus
                />
              </div> */}
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Timezone, city, or country"
                autoFocus
              />
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchMode(false);
                setQuery("");
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
                const offsetHours = formatOffset(zone);
                const offsetLabel =
                  offsetHours >= 0 ? `GMT+${offsetHours}` : `GMT${offsetHours}`;
                const label = `${city}, ${country}`;
                const key = `${zone}-${city.replace(/\s+/g, "_")}`;
                return (
                  <div
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTimezone(city, country, zone);
                    }}
                    className="flex items-center   gap-2 px-3 py-1 hover:bg-zinc-700 cursor-pointer text-zinc-500 transition rounded-md"
                  >
                    <span className="text-xs bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md">
                      {offsetLabel}
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
