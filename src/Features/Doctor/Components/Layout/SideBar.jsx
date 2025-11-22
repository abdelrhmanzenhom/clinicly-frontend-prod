import {
  Brain,
  CalendarRangeIcon,
  LayoutDashboard,
  Menu,
  Notebook,
  NotebookPen,
  NotebookTabs,
  ReceiptText,
  Timer,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../../../Context/AuthContext";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
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
          {isOpen && <span className="font-bold">Doctor Name</span>}
        </button>

        <nav className="flex flex-col gap-4">
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
            to="add-prescription"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <NotebookPen size={20} />
            {isOpen && <span>Add Prescription</span>}
          </Link>

          <Link
            to="read-prescriptions"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <NotebookTabs size={20} />
            {isOpen && <span>Prescriptions</span>}
          </Link>

          <Link
            to="patients"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <Users size={20} />
            {isOpen && <span>Patients</span>}
          </Link>

          <Link
            to="assistant"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <Brain size={20} />
            {isOpen && <span>AI Diagnosis</span>}
          </Link>

          <Link
            to="profile"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 `}
          >
            <User size={20} />
            {isOpen && <span>Profile</span>}
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
