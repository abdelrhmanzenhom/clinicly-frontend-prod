import React from "react";
import { Outlet } from "react-router";
import HomeNavBar from "../../../Components/Navigation/HomeNavBar";
import MainFooter from "../../../Components/Footer/MainFooter";

export default function Layout() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">
        <HomeNavBar />
        <Outlet />;
        <MainFooter />
      </div>
    </>
  );
}
