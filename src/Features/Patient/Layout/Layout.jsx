import React from "react";
import { Outlet } from "react-router";
import SideBar from "../components/Layout/SideBar";

export default function Layout() {
  return (
    <>
      <div className="flex  min-h-screen">
        <SideBar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
