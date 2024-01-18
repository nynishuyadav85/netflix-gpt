import React from "react";

import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayimgMovies";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
