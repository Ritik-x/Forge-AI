import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const RemoveObjects = () => {
  const [input, setInput] = useState(null); // image file
  const [object, setObject] = useState(""); // object name
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input || !object.trim()) {
      alert("Please upload an image and enter the object to remove.");
      return;
    }

    // Example API logic or processing
    console.log("Processing image:", input);
    console.log("Removing object:", object);

    // Add your image upload & object removal logic here

    try {
      setLoading(true);

      // Only allow one word (no spaces) for object name
      if (object.trim().split(/\s+/).length > 1) {
        setLoading(false);
        return toast("Please enter only one object name (no spaces).");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        `${API_BASE_URL}/api/ai/remove-image-object`,
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
          <Sparkles className="w-6 h-6 text-pink-500" />
          <h1 className="font-semibold text-xl text-white">Object Removal</h1>
        </div>

        {/* Upload Field */}
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

        {/* Object Description */}
        <label className="text-sm text-gray-400 font-medium block mb-2">
          Describe the object to remove
        </label>
        <textarea
          value={object}
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          placeholder="Enter the name of the object you want to remove"
          className="w-full py-2.5 px-4 mb-6 text-sm bg-[#121212] border border-gray-600 text-white rounded-md placeholder-gray-500 focus:border-blue-500 outline-none transition"
          required
        />

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
            <Scissors className="w-4 h-4" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 bg-[#1e1e1e] rounded-2xl border border-gray-700 shadow-lg min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <Scissors className="w-5 h-5 text-gray-300" />
          <h1 className="text-xl font-semibold text-white">Image Processed</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center min-h-[200px]">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <Scissors className="w-8 h-8" />
              <p>Upload an image and describe the object you want to remove.</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image " className="mt-4 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveObjects;
