import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets.js";
import { DollarSign, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      {" "}
      <div className="h-full overflow-y-scroll p-6">
        <div className="flex justify-start gap-4 flex-wrap">
          {/* creation card  */}
          <div className="flex justify-between items-center w-74 p-4 bg-gray-950 rounded-xl border border-gray-400">
            <div className="text-slate-400 ">
              <p className="text-sm ">Total Creations</p>
              <h1 className="text-2xl font-bold">{creations.length}</h1>
            </div>

            <div>
              <Sparkles className="w-4 h-5 text-yellow-600" />
            </div>
          </div>

          {/*active plan   */}
          <div className="flex justify-between items-center w-74 p-4 bg-gray-950 rounded-xl border border-gray-400">
            <div className="text-slate-400 ">
              <p className="text-sm ">Active Plan</p>
              <h1 className="text-2xl font-bold">
                <Protect plan="premium" fallback="free">
                  Premium
                </Protect>
              </h1>
            </div>

            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0a0522] to-[#886ea4] flex justify-center items-center">
              <DollarSign className="w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="mt-6 mb-4"> Recent Creations</p>

          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
