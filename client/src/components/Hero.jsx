import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-20 relative flex flex-col items-center justify-center w-full min-h-[70vh] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-cover bg-no-repeat bg-[#0f0f0f] text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Create Amazing Content with <br />
          <span className="text-indigo-400">ForgeAI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Create images, write content, and edit visuals — all with AI in one
          powerful tool.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate("/ai")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 shadow-lg"
        >
          Start Your Creatings
        </button>
        <button className="px-6 py-3 border border-gray-500 hover:border-white text-gray-300 hover:text-white rounded-lg transition-all duration-200">
          Watch Demo
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 text-white">
        <img src={assets.user_group} alt="" className="h-8 " /> Trusted By 2k+
      </div>
    </div>
  );
};

export default Hero;
