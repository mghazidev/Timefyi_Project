"use client";
import React from "react";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import AudioWaveform from "./TWaveform";
import RotateIcon from "../icons/RotateIcon";
import { TDatePicker } from "./TDatePicker";

function formatHoursToLabel(hours: number) {
  const totalMinutes = Math.round(hours * 60);
  const hh24 = Math.floor(totalMinutes / 60) % 24;
  const mm = totalMinutes % 60;
  const meridiem = hh24 >= 12 ? "PM" : "AM";
  const hh12 = hh24 % 12 === 0 ? 12 : hh24 % 12;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return { label: `${pad(hh12)}:${pad(mm)}`, meridiem };
}

const TTimezoneCard = ({
  id,
  city,
  country,
  gmtName,
  gmtSign,
  offset,
  globalTime,
  onGlobalTimeChange,
  listeners,
  attributes,
  onDelete,
  isClockRunning,
  setIsClockRunning,
}: any) => {
  const [isActive, setIsActive] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [isEditedTime, setIsEditedTime] = React.useState(false);
  const localTime = (globalTime + offset + 24) % 24;
  const { label, meridiem } = formatHoursToLabel(localTime);

  const computeLocalDate = () => {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityMs = utcMs + offset * 3600 * 1000;
    return new Date(cityMs);
  };

  React.useEffect(() => {
    setSelectedDate(computeLocalDate());
  }, [globalTime, offset]);

  const handleDateChange = (newDate: Date) => {
    const utcMs = newDate.getTime() - offset * 3600 * 1000;
    const utcDate = new Date(utcMs);

    const globalHours =
      utcDate.getUTCHours() +
      utcDate.getUTCMinutes() / 60 +
      utcDate.getUTCSeconds() / 3600;

    onGlobalTimeChange(globalHours);
  };

  const handleWaveformChange = (newLocalTime: number) => {
    setIsClockRunning(false);

    const adjustedGlobalTime = (newLocalTime - offset + 24) % 24;
    onGlobalTimeChange(adjustedGlobalTime);
    setIsEditedTime(true);
  };

  const handleReset = () => {
    setIsEditedTime(false);

    const now = new Date();
    const currentUTC =
      now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    onGlobalTimeChange(currentUTC);

    setIsClockRunning(true);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div
      {...listeners}
      {...attributes}
      onClick={() => setIsActive(!isActive)}
      className={`draggable w-full relative flex  select-none flex-col bg-zinc-900 max-h-[220px] justify-between overflow-hidden rounded-2xl border p-4 text-white transition-colors sm:rounded-xl sm:p-5 cursor-pointer
              ${isActive ? "border-yellow-400 " : "border-zinc-800 "}`}
    >
      <div
        title="Central European Standard Time"
        className="drag-handle absolute bottom-0 left-0 right-0 top-0 z-[10] bg-transparent"
      ></div>
      <div className="flex items-center justify-between gap-3 ">
        <p className="truncate text-base text-neutral-500">
          {city}, {country}
        </p>
        <div
          className="z-[20] flex items-center gap-2"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {isEditedTime && (
            <button
              className="cursor-pointer text-red-400 hover:text-zinc-200"
              onClick={handleReset}
            >
              <RotateIcon size={18} />
            </button>
          )}
          <button className="cursor-pointer text-zinc-500 hover:text-zinc-200">
            <EditIcon size={18} />
          </button>
          {/* Delete */}
          <button
            className="cursor-pointer text-zinc-500 hover:text-zinc-200"
            onClick={handleDeleteClick}
          >
            <TrashIcon size={18} />
          </button>
        </div>
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="font-mono text-3xl ">
            <span>{label.split(":")[0]}</span>
            <span
              className={`mx-0.5 font-serif transition-opacity duration-200 ${
                isClockRunning ? "blink-colon" : "opacity-60"
              }`}
            >
              :
            </span>
            <span>{label.split(":")[1]}</span>
            <span className="ml-2 font-sans font-medium text-neutral-600">
              {meridiem}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-1.5 text-sm text-neutral-500">
        <p>
          {gmtName} {offset >= 0 ? `${gmtSign}${offset}h` : `${offset}h`}
        </p>
        .
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <TDatePicker value={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <AudioWaveform value={localTime} onChange={handleWaveformChange} />
      </div>
    </div>
  );
};

export default TTimezoneCard;
