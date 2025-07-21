import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Sparkles, Edit, HashIcon, Hash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
// Removed duplicate axios import
const BlogTitle = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Health",
    "Lifestyle",
    "Travel",
    "Education",
    "Business",
    "Food",
    "Sports",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // Set initial state to empty string

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // handle form submission here

    try {
      setLoading(true);

      const prompt = `Generate a blog title for the ${input} in category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content); // <-- Set content state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
    console.log({ input, selectedCategory });
  };

  return (
    <div className="h-full min-h-screen overflow-y-auto px-6 py-8 flex flex-col md:flex-row gap-6 text-slate-300 bg-[#0f0f0f]">
      {/* Left Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 p-6 bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="font-semibold text-xl text-white">Title Generator</h1>
        </div>

        <label className="text-sm text-gray-400 mb-2 block font-medium">
          Keywords
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full py-2 px-4 mb-6 text-sm text-white bg-[#121212] border border-gray-600 rounded-md outline-none placeholder-gray-500 focus:border-blue-500"
          placeholder="Food"
          required
        />

        <label className="text-sm text-gray-400 mb-2 block font-medium">
          Category
        </label>
        <div className="flex flex-wrap gap-3 mb-6">
          {blogCategories.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-150 ${
                selectedCategory === item
                  ? "bg-blue-700 text-white border-blue-600"
                  : "text-gray-400 border-gray-600 hover:bg-gray-800"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition duration-200"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-4 h-4" />
          )}
          Get Titles
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 bg-[#1e1e1e] rounded-2xl border border-gray-700 shadow-lg min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <HashIcon className="w-5 h-5 text-gray-300" />
          <h1 className="text-xl font-semibold text-white">Your Titles</h1>
        </div>
        {content.trim() ? (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-400">
            <div className=".reset-tw">
              <Markdown>{(content || "").toString()}</Markdown>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center min-h-[200px]">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <Hash className="w-8 h-8" />
              <p>Choose a category & enter keywords to generate blog titles</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitle;
