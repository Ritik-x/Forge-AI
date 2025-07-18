import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Define sidebar routes
const navItems = [
  { to: "/ai", label: "Dashboard", icon: House },
  { to: "/ai/write-article", label: "Write Article", icon: SquarePen },
  { to: "/ai/generateimages", label: "Generate Images", icon: Image },
  { to: "/ai/blogtitle", label: "Blog Title", icon: Hash },
  { to: "/ai/removebackground", label: "Remove Background", icon: Eraser },
  { to: "/ai/removeobject", label: "Remove Object", icon: Scissors },
  { to: "/ai/reviewresume", label: "Review Resume", icon: FileText },
  { to: "/ai/community", label: "Community", icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-[#0f0f0f] text-white border-r border-gray-700 flex flex-col justify-between max-sm:absolute top-14 bottom-0 z-20 transition-transform duration-300 ease-in-out ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      }`}
    >
      <div className="w-full p-6 flex flex-col items-center">
        <img
          src={user?.imageUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-2"
        />
        <h2 className="text-center font-medium">{user?.fullName}</h2>

        {/* Navigation links */}
        <div className="mt-8 w-full space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-5 py-2 flex items-center gap-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C91F6] to-[#1f1528] text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 w-full space-y-2">
          <button
            onClick={openUserProfile}
            className="w-full text-sm px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
          >
            👤 Profile
          </button>

          <button
            onClick={signOut}
            className="w-full text-sm px-4 py-2 mt-2 rounded-md border border-red-600 bg-red-700 text-white flex items-center justify-center gap-2 hover:bg-red-800 transition-colors duration-200"
          >
            Sign Out <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
