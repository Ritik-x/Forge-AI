import React from "react";
import { assets } from "../assets/assets"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <>
      <div className="fixed z-5 w-full backdrop-blur-3xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
        <img
          onClick={navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44"
        />
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className=" items-center flex px-4 py-2 rounded-3xl bg-[#ffffff10] border border-[#ffffff30] backdrop-blur-sm text-white font-medium hover:bg-[#ffffff20] transition duration-300 shadow-md hover:shadow-purple-800 hover:cursor-pointer"
          >
            Get Started <ArrowRight className="w-4 h-4 " />{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
