import React from "react";
import { MoonLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <MoonLoader size={100} color="orange" />
    </div>
  );
};

export default Loader;
