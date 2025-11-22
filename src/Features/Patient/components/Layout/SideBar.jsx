import {
  Brain,
  CalendarRangeIcon,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Timer,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../../../Context/AuthContext";
import { Avatar } from "@mui/material";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          id="aside-backdrop"
          className="bg-black/20 absolute w-full h-full z-20"
        ></div>
      )}
      <div id="placeholder" className="w-16"></div>
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } absolute h-full top-0 left-0  bg-white  text-gray-800  shadow-r transition-all duration-300 p-4 z-20`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            !isOpen ? "justify-center" : "justify-between"
          } flex items-center  w-full mb-10`}
        >
          <Menu size={20} />
        </button>

        <nav className="flex flex-col gap-4">
          {isOpen && (
            <Link to="profile" className="flex items-center gap-4 mb-4">
              <Avatar />
              <span className="font-bold">
                {user?.firstName + " " + user?.lastName}
              </span>
            </Link>
          )}
          <Link
            to=""
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <LayoutDashboard size={20} />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            to="appointments"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <CalendarRangeIcon size={20} />
            {isOpen && <span>Appointments</span>}
          </Link>

          <Link
            to="records"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <Timer size={20} />
            {isOpen && <span>Records</span>}
          </Link>

          <Link
            to="bills"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <ReceiptText size={20} />
            {isOpen && <span>Bills</span>}
          </Link>

          <Link
            to="assistant"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <Brain size={20} />
            {isOpen && <span>AI Specialty Picker</span>}
          </Link>
        </nav>
        {isOpen && (
          <div>
            <button onClick={logout} className="btn btn-outline mt-10">
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
