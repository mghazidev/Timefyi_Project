import React from "react";
import WorldIcon from "../icons/world";
import { TCategoryCardProps } from "../types";
import TCategoryCard from "../TCategoryCard";

const catData: TCategoryCardProps[] = [
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
  {
    icon: <WorldIcon size={32} />,
    title: "Timezones",
    description: "Convert time across different zones",
  },
];

const CategorySelectionSection = () => {
  return (
    <section className="p-3 md:px-8 bg-black w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto">
        {catData.map((cat, index) => (
          <TCategoryCard
            key={index}
            icon={cat.icon}
            title={cat.title}
            description={cat.description}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySelectionSection;
