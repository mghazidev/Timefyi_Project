"use client";
import React from "react";
import TTimezoneCard from "@/components/shared/TTimezoneCard";
import TAddNewTimezoneCard from "@/components/shared/TAddNewTimezoneCard";
import { useTimezoneView } from "@/app/context/TimezoneViewContext";
import { useUserTimezone } from "@/app/hooks/useUserTimezone";
import { useTimezoneClock } from "@/app/hooks/useTimezoneClock";
import { normalizeTimezone } from "@/lib/helpers";
import TimezonePageGridLayout from "@/components/sections/TimezonePageGridLayout";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const page = () => {
  const { view } = useTimezoneView();
  const userTimezone = useUserTimezone();
  const [globalTime, setGlobalTime, isRunning, setIsRunning] =
    useTimezoneClock();
  const [timezones, setTimezones] = React.useState<any[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("userTimezones");
    setTimezones(stored ? JSON.parse(stored) : []);
  }, []);

  React.useEffect(() => {
    if (!userTimezone) return;

    setTimezones((prev) => {
      if (prev.length > 0) return prev;

      const normalized = normalizeTimezone(userTimezone);
      localStorage.setItem("userTimezones", JSON.stringify([normalized]));
      return [normalized];
    });
  }, [userTimezone]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTimezones((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleAddTimezone = (tz: any) => {
    const normalized = normalizeTimezone(tz);

    setTimezones((prev) => {
      const updated = [...prev, normalized];
      localStorage.setItem("userTimezones", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteTimezone = (id: string) => {
    setTimezones((prev) => {
      const updated = prev.filter((tz) => tz.id !== id);
      localStorage.setItem("userTimezones", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="h-full">
      {view === "layout1" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={timezones} strategy={rectSortingStrategy}>
            <div
              className="
                  grid 
                  gap-3 
                  overscroll-contain 
                  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
                  justify-items-center
                  "
            >
              {timezones.map((tz) => (
                <SortableTimezoneCard
                  key={tz.id}
                  id={tz.id}
                  city={tz.city}
                  country={tz.country}
                  gmtName={tz.gmtName}
                  gmtSign={tz.gmtSign}
                  offset={tz.offset}
                  globalTime={globalTime}
                  onGlobalTimeChange={setGlobalTime}
                  onDelete={handleDeleteTimezone}
                  isClockRunning={isRunning}
                  setIsClockRunning={setIsRunning}
                />
              ))}
              <TAddNewTimezoneCard onAddTimezone={handleAddTimezone} />
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <TimezonePageGridLayout
          onAddTimezone={handleAddTimezone}
          timezones={timezones}
          onDeleteTimezone={handleDeleteTimezone}
        />
      )}
    </div>
  );
};

export default page;

function SortableTimezoneCard({
  id,
  city,
  country,
  gmtName,
  gmtSign,
  offset,
  globalTime,
  onGlobalTimeChange,
  onDelete,
  isClockRunning,
  setIsClockRunning,
}: {
  id: string;
  city: string;
  country: string;
  gmtName: string;
  gmtSign: string;
  offset: any;
  globalTime: any;
  onGlobalTimeChange: any;
  onDelete: (id: string) => void;
  isClockRunning: any;
  setIsClockRunning: any;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = require("@dnd-kit/sortable").useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div className="w-full" ref={setNodeRef} style={style}>
      <TTimezoneCard
        id={id}
        city={city}
        country={country}
        gmtName={gmtName}
        gmtSign={gmtSign}
        offset={offset}
        listeners={listeners}
        attributes={attributes}
        globalTime={globalTime}
        onGlobalTimeChange={onGlobalTimeChange}
        onDelete={onDelete}
        isClockRunning={isClockRunning}
        setIsClockRunning={setIsClockRunning}
      />
    </div>
  );
}
