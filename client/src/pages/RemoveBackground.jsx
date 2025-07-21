import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

import toast from "react-hot-toast";
const RemoveBackground = () => {
  const [input, setInput] = useState(null);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) return alert("Please upload an image.");

    // You can add background removal logic here
    console.log("Image uploaded:", input);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input); // Fixed: removed space in key

      const { data } = await axios.post(
        `${API_BASE_URL}/api/ai/remove-image-background`,
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content); // Make sure data.content is a valid image URL or base64 string
      } else {
        toast.error(data.message || "Failed to remove background.");
      }
    } catch (error) {
      // Improved error handling for backend error messages
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMsg);
    }

    setLoading(false);
  };

  return (
    <div className="h-full min-h-screen justify-between overflow-y-auto px-6 py-8 flex flex-col md:flex-row gap-6 text-slate-300 bg-[#0f0f0f]">
      {/* Left Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 p-6 bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h1 className="font-semibold text-xl text-white">
            Background Removal
          </h1>
        </div>

        <label className="text-sm text-gray-400 mb-2 block font-medium">
          Upload Image
        </label>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="w-full py-2 px-4 mb-6 text-sm text-white bg-[#121212] border border-gray-600 rounded-md outline-none placeholder-gray-500 focus:border-blue-500"
          required
        />

        <p className="text-sm font-light mt-2 text-gray-200">
          Supports JPG, PNG & other formats
        </p>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition duration-200"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin">
              {" "}
            </span>
          ) : (
            <Eraser className="w-5 h-5 text-gray-300" />
          )}
          Remove Background
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 bg-[#1e1e1e] rounded-2xl border border-gray-700 shadow-lg min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <Eraser className="w-4 h-4" />

          <h1 className="text-xl font-semibold text-white">Image Processed</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center min-h-[200px]">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <Eraser className="w-8 h-8" />
              <p>Upload the image to remove background</p>
            </div>
          </div>
        ) : (
          <img src={content} className="w-full h-full mt-4" />
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
