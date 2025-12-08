import React from "react";
import { MoonLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-7xl mx-auto grid content-center min-h-screen">
      <MoonLoader size={66} color="orange" />
    </div>
  );
};

export default Loader;
