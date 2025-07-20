import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <nav className="w-full px-4 sm:px-16 py-4 flex items-center justify-between border-b border-white/20">
      {/* Logo click navigates home */}
      <img
        onClick={() => navigate("/")} // ✅ FIXED: Now wrapped in a function
        src={assets.logo}
        alt="logo"
        className="h-8 sm:h-10 cursor-pointer"
      />

      {/* User image */}
      <img
        src={user?.imageUrl}
        alt="user"
        className="h-8 sm:h-10 rounded-full cursor-pointer"
        onClick={() => navigate("/profile")} // Optional: profile page navigation
      />
    </nav>
  );
};

export default Navbar;
