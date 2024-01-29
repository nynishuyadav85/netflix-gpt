import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute bg-gradient-to-r from-black text-white">
      <h1 className="text-6xl font-bold">{title}</h1>
      <h2 className="py-6 text-lg w-1/2">{overview}</h2>
      <div>
        <button className="bg-white text-black p-4 px-12 text-xl  rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg  hover:bg-opacity-80">
          🎬 View Details
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
