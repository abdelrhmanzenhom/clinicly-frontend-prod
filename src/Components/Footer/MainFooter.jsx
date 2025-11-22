import React from "react";
import { Link } from "react-router";

export default function MainFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Link to="/" className="font-bold text-lg">
            Al Shifa Medical Center
          </Link>
          <div className="text-sm text-slate-300 mt-2">
            123 Health St., Cairo, Egypt
          </div>
          <div className="text-sm text-slate-300 mt-2">
            Mon — Sat: 8:00 — 20:00
          </div>
        </div>

        <div>
          <div className="font-semibold">Quick links</div>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>
              <Link to="/patient/book" className="hover:underline">
                Book appointment
              </Link>
            </li>
            <li>
              <Link to="/doctor/apply" className="hover:underline">
                Join as doctor
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="hover:underline">
                Patient login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Contact</div>
          <div className="text-sm text-slate-300 mt-3">
            Phone: +20 2 1234 5678
          </div>
          <div className="text-sm text-slate-300">
            Email: info@alshifa.example
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} Al Shifa Medical Center — Powered by
        Clinic.ly
      </div>
    </footer>
  );
}
