import React from "react";
import { areDatesEqual, isDoctorAvailable } from "../Utils/calenderHelpers";
import Calendar from "react-calendar";
import FormTitle from "./FormTitle";
import clsx from "clsx";
import "./DoctorCalender.css";
import useWindowWidth from "../Hooks/useWindowWidth";

export default function DoctorCalender({
  activeDate,
  setActiveDate,
  activeDoctor,
}) {
  const width = useWindowWidth();
  //   console.log(width);
  return (
    <div className="mt-8 px-8">
      <FormTitle text="Step 5: Select a date" />
      <Calendar
        tileDisabled={({ date }) => !isDoctorAvailable(date, activeDoctor)}
        minDate={new Date()}
        value={activeDate}
        onChange={(val, e) => {
          setActiveDate(val);
        }}
        showDoubleView={width >= 768}
        view="month"
        next2Label={null}
        prev2Label={null}
        className={` bg-bg-light-primary text-text-dark p-4 mx-auto`}
        tileClassName={({ date }) =>
          clsx(
            "rounded-full",
            "transition-all",
            "duration-300",
            "h-12",
            !isDoctorAvailable(date, activeDoctor) && "text-gray-300",

            {
              "cursor-pointer  hover:bg-bg-light-secondary":
                isDoctorAvailable(date, activeDoctor) &&
                !areDatesEqual(date, activeDate),
            },

            areDatesEqual(date, activeDate) &&
              "bg-accent-primary-main text-text-light"
          )
        }
      />
    </div>
  );
}
