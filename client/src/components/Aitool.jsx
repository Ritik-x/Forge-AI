import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Aitool = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <>
      <div className="px-4 sm:px-20 xl:px-32 my-24 bg-[#0f0f0f] text-white">
        <div className="text-center">
          <h2 className="text-slate-200 text-[36px] font-semibold">AI Tools</h2>
          <p className="text-gray-400">
            Everything you need to create stunning content with ForgeAI.
          </p>
        </div>

        <div className="flex flex-wrap mt-10 justify-center gap-6">
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className="p-8 bg-[#1a1a2e] text-white max-w-xs rounded-lg shadow-lg border border-[#ffffff20] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => user && navigate(tool.path)}
            >
              <tool.Icon className="w-12 h-12 mb-4 text-indigo-400" />
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Aitool;
