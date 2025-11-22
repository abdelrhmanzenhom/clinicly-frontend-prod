import React from "react";
import { Outlet } from "react-router";
import MainFooter from "../../../Components/Footer/MainFooter";
import Logo from "../../../Components/Navigation/Logo";

export default function Layout() {
  return (
    <>
      <div className=" bg-gray-50">
        <header className=" p-4">
          <Logo />
        </header>
        <Outlet />
        <MainFooter />
      </div>
    </>
  );
}
