"use client";
import { createContext, useContext, useState } from "react";

type TimezoneViewContextType = {
  view: "layout1" | "layout2";
  toggleView: () => void;
};

const TimezoneViewContext = createContext<TimezoneViewContextType | undefined>(
  undefined
);

export function TimezoneViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setView] = useState<"layout1" | "layout2">("layout2"); // default

  const toggleView = () => {
    setView((prev) => (prev === "layout1" ? "layout2" : "layout1"));
  };

  return (
    <TimezoneViewContext.Provider value={{ view, toggleView }}>
      {children}
    </TimezoneViewContext.Provider>
  );
}

export function useTimezoneView() {
  const context = useContext(TimezoneViewContext);
  if (!context) {
    throw new Error("useTimezoneView must be used inside TimezoneViewProvider");
  }
  return context;
}
