import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <h1 className="text-4xl font-extrabold">Forge AI</h1>
          <p className="mt-6 text-sm">
            ForgeAI is your ultimate AI powerhouse—generate stunning content,
            transform images, remove backgrounds, and supercharge creativity,
            all in one place. ⚡ Built for creators. Powered by cutting-edge AI.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-400">Company</h2>
            <ul className="text-sm space-y-2">
              <li onClick={() => navigate("/")}>Home</li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-400 mb-5">
              Subscribe our services
            </h2>
            <div className="text-sm space-y-2">
              <p>To Generate Images , Remove Objects & Resume-Review .</p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-gray-800 w-24 h-9 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © Forge AI. All Right Reserved By----{" "}
        <span>Ritik Garg</span>.
      </p>
    </footer>
  );
};

export default Footer;
