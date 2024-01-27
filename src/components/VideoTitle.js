import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{overview}</h2>
      <div>
        <button>Play</button>
        <button>View Details</button>
      </div>
    </div>
  );
};

export default VideoTitle;
