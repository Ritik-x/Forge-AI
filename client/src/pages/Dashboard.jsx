import React, { useEffect, useState } from "react";
import { DollarSign, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/user/get-user-creations`,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setCreations(Array.isArray(data.creations) ? data.creations : []);
      } else {
        toast.error(data.message);
        setCreations([]);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setCreations([]);
    }
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
              <h1 className="text-2xl font-bold">
                {Array.isArray(creations) ? creations.length : 0}
              </h1>
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

        {loading ? (
          <div className="flex justify-center items-center h-3/4">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-purple-800 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="mt-6 mb-4"> Recent Creations</p>
            {creations.length > 0 ? (
              creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))
            ) : (
              <div className="text-gray-400 text-center">
                No creations found.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
