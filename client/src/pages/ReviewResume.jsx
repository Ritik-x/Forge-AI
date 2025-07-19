import { File, Sparkles } from "lucide-react";
import React, { useState } from "react";

const ReviewResume = () => {
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) {
      alert("Please upload a file before submitting.");
      return;
    }

    // You can now use the `input` state, which holds the uploaded file
    console.log("Uploaded file:", input);
  };

  return (
    <div className="h-full min-h-screen justify-between overflow-y-auto px-6 py-8 flex flex-col md:flex-row gap-6 text-slate-300 bg-[#0f0f0f]">
      {/* Left Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 p-6 bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-gray-200" />
          <h1 className="font-semibold text-xl text-white">Resume Reviewer</h1>
        </div>

        <label className="text-sm text-gray-400 mb-2 block font-medium">
          Upload Resume
        </label>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="application/pdf"
          type="file"
          className="w-full py-2 px-4 mb-6 text-sm text-white bg-[#121212] border border-gray-600 rounded-md outline-none placeholder-gray-500 focus:border-blue-500"
          required
        />

        <p className="text-sm font-light mt-2 text-gray-200">
          Supports PDF only
        </p>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition duration-200"
        >
          <File className="w-4 h-4" />
          Review Resume
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 bg-[#1e1e1e] rounded-2xl border border-gray-700 shadow-lg min-h-[300px]">
        <div className="flex items-center gap-3 mb-4">
          <File className="w-5 h-5 text-gray-300" />
          <h1 className="text-xl font-semibold text-white">Resume-Analyzed</h1>
        </div>

        <div className="flex-1 flex justify-center items-center min-h-[200px]">
          <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
            <File className="w-8 h-8" />
            <p> Resume Analyzed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
