import React from "react";
import { Outlet } from "react-router";
import SideBar from "../Components/Layout/SideBar";

export default function DoctorLayout() {
  return (
    <div className="flex  min-h-screen">
      <SideBar />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}

/**
 *  <div className="flex  min-h-screen">
       
       <Sidebar />
 
       
       <main className="flex-1 p-8">
         <DashboardHeader title={header.title} subtitle={header.subtitle} />
 
     
         <div className="mt-8">
           <Outlet />
         </div>
       </main>
     </div>
 */
