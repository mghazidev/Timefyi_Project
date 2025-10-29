import React from "react";
import TTopBar from "@/components/shared/TTopBar";
import TSidebar from "@/components/shared/TSidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <TSidebar />

      <div className="flex-1 flex flex-col">
        <TTopBar />

        <main className="flex-1 p-6 overflow-y-auto m-2 rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
}
