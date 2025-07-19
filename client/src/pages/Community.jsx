import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets.js";
import { Heart } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full p-6 bg-[#0f0f0f] text-white">
      <h2 className="text-2xl font-semibold mb-4">Creations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={creation.content}
              alt="Creation"
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-gray-300 group-hover:text-white transition">
                {creation.prompt}
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-400">
                  {creation.likes.length} likes
                </p>
                <Heart
                  className={`h-5 w-5 hover:scale-110 transition-transform cursor-pointer ${
                    creation.likes.includes(user?.id)
                      ? "fill-red-500 text-red-300"
                      : "text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
