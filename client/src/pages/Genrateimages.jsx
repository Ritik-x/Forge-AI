import { Image, Sparkles, Edit } from "lucide-react";
import React, { useState } from "react";

const Genrateimages = () => {
  const imageStyle = [
    "Realistic Style",
    "Anime Style",
    "Cartoon Style",
    "Artistic Style",
    "Fantasy Style",
    "Realistic",
    "3D Style",
    "Portrait",
  ];

  const [selectedstyle, setSelectedstyle] = useState("Realistic Style");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log({ input, selectedstyle });
    setPublish(true);
  };

  return (
    <div className="h-full min-h-screen overflow-y-auto px-6 py-10 flex flex-col md:flex-row gap-6 text-slate-300 bg-[#0d0d0d]">
      {/* Left */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 p-6 bg-[#181818] rounded-2xl border border-gray-700 shadow-[0_0_20px_#00000033]"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="font-semibold text-xl text-white">Image Generator</h1>
        </div>

        <label className="text-sm text-gray-400 font-medium block mb-2">
          Describe Your Image
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="A futuristic city floating in the sky..."
          className="w-full py-2.5 px-4 mb-6 text-sm bg-[#121212] border border-gray-600 text-white rounded-md placeholder-gray-500 focus:border-blue-500 outline-none transition"
          required
        />

        <label className="text-sm text-gray-400 font-medium block mb-2">
          Choose a Style
        </label>
        <div className="flex flex-wrap gap-3 mb-6">
          {imageStyle.map((style, index) => (
            <span
              key={index}
              onClick={() => setSelectedstyle(style)}
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all duration-150 ${
                selectedstyle === style
                  ? "bg-blue-700 text-white border-blue-600"
                  : "text-gray-400 border-gray-600 hover:bg-gray-800"
              }`}
            >
              {style}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-600 transition-colors" />
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
          </label>
          <span className="text-sm text-gray-400">Make image public</span>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition duration-200 shadow-sm"
        >
          <Image className="w-4 h-4" />
          Generate Image
        </button>
      </form>

      {/* Right */}
      <div className="w-full md:w-1/2 p-6 bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-[0_0_20px_#00000033] min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-gray-300" />
          <h1 className="text-xl font-semibold text-white">Your Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center min-h-[200px]">
          {!publish ? (
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center hover:text-white transition">
              <Image className="w-10 h-10 opacity-70" />
              <p className="text-sm">
                Choose a style and description to generate
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="mt-2 text-green-400 text-sm">
                ✅ Image Generated Successfully
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Genrateimages;
