import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">URL Shortener</div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex gap-6">
            <Link to="/Register" className="hover:underline text-white">
              Register
            </Link>
            <Link to="/Login" className="hover:underline text-white">
              Login
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="/Register"
            className="block hover:underline text-white"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/Login"
            className="block hover:underline text-white"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
