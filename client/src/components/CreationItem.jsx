import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl bg-[#0f0f0f] border border-gray-700 rounded-xl cursor-pointer hover:border-gray-500 transition-all duration-200"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-medium text-white">{item.prompt}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {item.type} •{" "}
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "No date"}
          </p>
        </div>
        <button className="border border-yellow-800 bg-yellow-900/10 text-yellow-400 px-4 py-1 rounded-full text-sm hover:bg-yellow-900/30 transition">
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="Generated content"
              className="mt-3 w-full max-w-md rounded-lg"
            />
          ) : (
            <div className="mt-3 text-sm text-slate-300 whitespace-pre-wrap">
              <Markdown>
                {typeof item.content === "string"
                  ? item.content
                  : "⚠️ Invalid markdown content"}
              </Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
