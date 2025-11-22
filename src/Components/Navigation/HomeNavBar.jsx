import React from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import { UserCircle } from "lucide-react";

export default function HomeNavBar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm md:px-8">
      <div className="flex justify-between w-full">
        <Logo />
        {/* Mobile menu button */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile dropdown menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 mt-3 p-2 shadow right-0"
          >
            <li>
              <Link className="p-2 text-lg" to="/auth/login">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link className="p-2 text-lg" to="/doctors">
                See Doctors
              </Link>
            </li>
            <li>
              <Link className="p-2 text-lg" to="/auth/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 px-1">
          <li>
            <Link to="/patient/appointments/book" className="btn btn-primary">
              Book Appointment
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="btn btn-neutral">
              See Doctors
            </Link>
          </li>
          <li>
            <Link to="/auth/login" className="btn btn-outline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
