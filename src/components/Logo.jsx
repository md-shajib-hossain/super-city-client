import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="">
      <Link to="/">
        <div className="flex items-center justify-center">
          <img className="w-[60px] rounded-full" src={logo} alt="" />
          <h2 className="revalia-regular  font-extrabold text-green-700 md:text-3xl md:w-full  text-2xl w-[200px] ">
            Super<span className="text-primary  font-extrabold">City</span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
