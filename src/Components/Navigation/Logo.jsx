import React from "react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
        AS
      </div>
      <div>
        <div className="font-semibold">Al Shifa Medical Center</div>
        <div className="text-xs text-slate-500">Care you can trust</div>
      </div>
    </Link>
  );
}
