import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const Writearticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500 - 800 words)" },
    { length: 1200, text: "Medium (800 - 1200 words)" },
    { length: 1600, text: "Large (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("  ");

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      setLoading(true);
      const prompt = `write an article about ${input} in ${selectedLength.text}`;
      console.log("Prompt:", prompt);

      const token = await getToken();
      console.log("Token:", token);

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("API response:", data);

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("ERROR OBJECT:", error);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong!";
      toast.error(msg);
    }
    setLoading(false);
  };

  return (
    <div className="h-full min-h-screen overflow-y-auto px-6 py-8 flex flex-col md:flex-row gap-6 text-slate-300 bg-[#0f0f0f]">
      {/* Left Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 p-6 bg-[#201919] rounded-2xl border border-gray-700 shadow-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <h1 className="font-semibold text-xl text-white">Article Config</h1>
        </div>

        <label className="font-medium text-sm text-gray-400 mb-2 block">
          Article Topic
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full py-2 px-4 mb-6 text-sm text-white bg-[#1a1a1a] border border-gray-600 rounded-md outline-none placeholder-gray-500 focus:border-blue-500"
          placeholder="Rapidly Increasing of IT Industry"
          required
        />

        <label className="font-medium text-sm text-gray-400 block mb-2">
          Article Length
        </label>
        <div className="flex flex-wrap gap-3 mb-6">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-150 ${
                selectedLength.text === item.text
                  ? "bg-blue-700 text-white border-blue-600"
                  : "text-gray-400 border-gray-600 hover:bg-gray-800"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition duration-200"
        >
          {loading ? (
            <span className="my-1 w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-4 h-4" />
          )}
          Get Article
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 bg-[#242020] rounded-2xl border border-gray-700 shadow-md min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <Edit className="w-5 h-5 text-gray-300" />
          <h1 className="text-xl font-semibold text-white">Your Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center min-h-[200px]">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <Edit className="w-8 h-8" />
              <p>Enter a topic to generate your article</p>
            </div>
          </div>
        ) : (
          <div className="mt-3  h-full overflow-y-scroll text-sm text-slate-400">
            <div className=".reset-tw">
              <Markdown>{(content || "").toString()}</Markdown>
            </div>

            {/* <div>{content}</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Writearticle;
