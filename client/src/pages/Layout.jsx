import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-8 h-14 flex items-center justify-between border-b border-gray-200">
        <span
          className="text-3xl font-extrabold tracking-tight h-8 sm:h-10 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 hover:scale-105 transition-transform duration-200 drop-shadow-lg"
          onClick={() => navigate("/")}
        >
          Forge AI
        </span>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-400 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Body */}
      <div className="flex flex-1 h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <SignIn />{" "}
    </div>
  );
};

export default Layout;
