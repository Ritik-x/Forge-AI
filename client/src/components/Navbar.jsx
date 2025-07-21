import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
// import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 px-4 sm:px-16 py-4 flex items-center justify-between border-b border-white/20 backdrop-blur-md bg-black/40 shadow-lg transition-all duration-300"
      style={{
        WebkitBackdropFilter: "blur(16px)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Logo / Brand */}
      <span
        className="text-3xl font-extrabold tracking-tight h-8 sm:h-10 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 hover:scale-105 transition-transform duration-200 drop-shadow-lg"
        onClick={() => navigate("/")}
      >
        Forge AI
      </span>
      {/* User image */}
      {user && (
        <img
          src={user.imageUrl}
          alt="user"
          className="h-10 w-10 rounded-full cursor-pointer border-2 border-purple-400 shadow-md hover:scale-110 transition-transform duration-200"
          onClick={openUserProfile}
        />
      )}
    </nav>
  );
};

export default Navbar;
