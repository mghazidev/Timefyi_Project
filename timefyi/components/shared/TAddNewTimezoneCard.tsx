"use client";
import React from "react";
import PlusIcon from "../icons/PlusIcon";
import CrossIcon from "../icons/CrossIcon";
import GlobeIcon from "../icons/GlobeIcon";
import { DateTime } from "luxon";
import { timezoneData, TimezoneData } from "@/lib/timezoneData";
import Fuse from "fuse.js";
import Input from "../ui/input";
interface UserTimezone {
  id: string;
  standardName: string;
  gmtName: string;
  gmtSign: string;
  gmtOffset: string;
  narrowOffset: string;
  abbreviatedName: string;
  unabbreviatedName: string;
  name: string;
  title: string;
  city: string;
  country: string;
}

type TAddNewTimezoneCardProps = {
  onAddTimezone: (tz: UserTimezone) => void;
  defaultSearchMode?: boolean;
};

const TAddNewTimezoneCard: React.FC<TAddNewTimezoneCardProps> = ({
  onAddTimezone,
  defaultSearchMode = false,
}) => {
  const [isSearchMode, setIsSearchMode] = React.useState(defaultSearchMode);
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<TimezoneData[]>([]);
  const [offsetMap, setOffsetMap] = React.useState<Record<string, number>>({});

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
    const sliced = results.slice(0, 8).map((r) => r.item);

    setSuggestions(sliced);

    const newOffsets: Record<string, number> = {};
    sliced.forEach(({ zone }) => {
      const offsetMinutes = DateTime.now().setZone(zone).offset;
      newOffsets[zone] = offsetMinutes / 60;
    });

    setOffsetMap(newOffsets);
  }, [query]);

  const handleSelectTimezone = (
    city: string,
    country: string,
    zone: string
  ) => {
    const offset = offsetMap[zone];

    const sign = offset >= 0 ? "+" : "-";
    const hours = Math.abs(offset).toString().padStart(2, "0");

    const newTimezone: UserTimezone = {
      id: `${zone}=x=${city}`,
      standardName: zone,
      gmtName: "GMT",
      gmtSign: sign,
      gmtOffset: `${hours}:00`,
      narrowOffset: `${sign}${Math.abs(offset)}`,
      abbreviatedName: `GMT${sign}${Math.abs(offset)}`,
      unabbreviatedName: `${country} Standard Time`,
      name: `${country} Standard Time`,
      title: `GMT${sign}${hours}:00 ${country} Standard Time — ${city}`,
      city,
      country,
    };

    onAddTimezone(newTimezone);

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
                const offset = offsetMap[zone];

                if (offset === undefined) return null;

                const sign = offset >= 0 ? "+" : "";
                return (
                  <div
                    key={zone + city}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTimezone(city, country, zone);
                    }}
                    className="flex items-center   gap-2 px-3 py-1 hover:bg-zinc-700 cursor-pointer text-zinc-500 transition rounded-md"
                  >
                    <span className="text-xs bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md">
                      GMT{sign}
                      {offset}
                    </span>
                    <span className="text-sm text-zinc-500 truncate">
                      {city}, {country}
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
