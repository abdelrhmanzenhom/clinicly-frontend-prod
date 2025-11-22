import { CirclePlus, Settings2 } from "lucide-react";
import AppointmentDisplay from "../Components/Appointments/AppointmentDisplay";
import CreateAppointment from "../Components/Appointments/CreateAppointment";
import { useState } from "react";

export default function Appointments() {
  const [tab, setTab] = useState("manage");
  return (
    <div>
      <div className="tabs tabs-lift">
        <label className="tab">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <Settings2 />
          <span className="ml-2">Manage</span>
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          {tab === "manage" && <AppointmentDisplay />}
        </div>
        <label className="tab">
          <input type="radio" name="my_tabs_4" />
          <CirclePlus />
          <span className="ml-2">Book</span>
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          {tab === "manage" && <CreateAppointment />}
        </div>
      </div>
    </div>
  );
}
