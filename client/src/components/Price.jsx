import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Price = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] text-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-200 mb-4 drop-shadow-md">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Start & Scale up your content. Find the perfect plan tailored to
            your needs.
          </p>
        </div>

        <div className="mt-12 bg-[#111111] p-8 rounded-2xl shadow-lg ring-1 ring-gray-800 max-w-4xl mx-auto">
          <PricingTable />
        </div>
      </div>
    </>
  );
};

export default Price;
