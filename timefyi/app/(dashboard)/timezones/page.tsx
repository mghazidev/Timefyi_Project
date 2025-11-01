"use client";
import React from "react";
import TTimezoneCard from "@/components/shared/TTimezoneCard";
import TAddNewTimezoneCard from "@/components/shared/TAddNewTimezoneCard";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import RotateIcon from "@/components/icons/RotateIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useTimezoneView } from "@/app/context/TimezoneViewContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const page = () => {
  const { view } = useTimezoneView();

  const [timezones, setTimezones] = React.useState([
    { id: "1", name: "Munich, Germany" },
    { id: "2", name: "Karachi, Pakistan" },
    { id: "3", name: "London, UK" },
    { id: "4", name: "Tokyo, Japan" },
    { id: "5", name: "Tokyo, Japan" },
    { id: "6", name: "Tokyo, Japan" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTimezones((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
                <SortableTimezoneCard key={tz.id} id={tz.id} name={tz.name} />
              ))}
              <TAddNewTimezoneCard />
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        //   <div
        //     className="
        //   grid
        //   gap-3
        //   overscroll-contain
        //   grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
        //   justify-items-center
        // "
        //   >
        //     <TTimezoneCard />
        //     <TTimezoneCard />

        //     <TAddNewTimezoneCard />
        //   </div>
        <div className="h-[100%] w-full grid gap-3 grid-cols-[2.5fr_1fr]">
          <div className="relative flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 py-14 transition-all lg:flex-grow lg:p-5">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-base text-gray-400 lg:mb-2 lg:text-xl">
                  Munich, Germany
                </h2>
                <Button variant={"danger"} className="text-sm font-medium">
                  <RotateIcon size={18} />
                  RESET TO NOW
                </Button>
              </div>
              <p className="my-2.5 font-mono text-5xl font-semibold  md:text-7xl lg:text-9xl">
                <span className="">10</span>
                <span className="mx-0.5 font-serif font-medium">:</span>
                <span className="">31</span>
                <span className="ml-2 font-sans text-2xl font-medium text-neutral-600">
                  PM
                </span>
              </p>
              <div>
                <p className="mt-1 border-b border-dashed border-zinc-700 pb-0.5 text-base text-gray-400 transition-colors hover:text-gray-300 hover:border-zinc-500 lg:mt-2 lg:text-xl relative z-[20] cursor-pointer">
                  Wednesday - October 29, 2025
                </p>
              </div>
              <div className="w-full flex justify-center mt-16">
                <Slider
                  defaultValue={[10]}
                  max={100}
                  step={1}
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
                <TAddNewTimezoneCard defaultSearchMode={true} />
              </DialogContent>
            </Dialog>

            <div>
              <button className="flex w-full items-center justify-between bg-zinc-800 p-2">
                <div className="flex items-center gap-2 ">
                  <span className="text-zinc-400 hover:text-red-400 cursor-pointer">
                    <TrashIcon size={17} />
                  </span>
                  <p className="text-zinc-400">Karachi, Pakistan</p>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 font-mono text-sm text-zinc-50 sm:text-base">
                    <span className="rounded-full bg-zinc-800 px-2 text-sm lg:text-xs xl:text-sm py-1 !text-xs text-red-500">
                      -4h
                    </span>
                    <span className="ml-0.5 flex text-base sm:text-lg">
                      <span>07</span>
                      <span className="mx-0.5 font-sans">:</span>
                      <span>57</span>
                      <span className="ml-1 inline-block w-[31px] font-sans font-medium text-zinc-500">
                        AM
                      </span>
                    </span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

function SortableTimezoneCard({ id, name }: { id: string; name: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    cursor: "grab",
  };

  return (
    <div
      className="w-full"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TTimezoneCard name={name} />
    </div>
  );
}
