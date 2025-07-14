import React from "react";
import { Link } from "@tanstack/react-router";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow">
      <div className="text-xl font-bold">URL Shortener</div>
      <div className="flex gap-4">
        <Link to="/Register" className="hover:underline text-white">
          Register
        </Link>
        <Link to="/Login" className="hover:underline text-white">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
