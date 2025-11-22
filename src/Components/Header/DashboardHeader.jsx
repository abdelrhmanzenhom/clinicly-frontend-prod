import React from "react";

export default function DashboardHeader({
  title = "Title",
  subtitle = "this is subtitle",
}) {
  return (
    <header className="flex flex-col justify-center items-center md:items-start ">
      <h1 className="font-bold text-3xl">{title}</h1>
      <p className="text-gray-500 mt-2">{subtitle}</p>
    </header>
  );
}
