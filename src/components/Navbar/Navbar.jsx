import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../SHared/Buttons/PrimaryButton";
import { AmpersandsIcon } from "lucide-react";

const Navbar = () => {
  const links = (
    <>
      <li className="hover:bg-primary hover:text-white transition duration-300 ease-initial hover:scale-120">
        <NavLink to="/">Home </NavLink>{" "}
      </li>
      <li className="hover:bg-primary hover:text-white transition duration-300 ease-initial hover:scale-120">
        <NavLink to="/all-issues">All Issues </NavLink>{" "}
      </li>
      <li className="hover:bg-primary hover:text-white transition duration-300 ease-initial hover:scale-120">
        <NavLink to="/login">Tab 1 </NavLink>{" "}
      </li>
      <li className="hover:bg-primary hover:text-white transition duration-300 ease-initial hover:scale-120">
        <NavLink to="tab2">Tab 2 </NavLink>{" "}
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-orange-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div>
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden  lg:flex px-5">
        <ul className="menu menu-horizontal  text-sm gap-8">{links}</ul>
      </div>
      <div className="navbar-end">
        <>
          <div className=" border-gray-200">
            <div className="flex items-center space-x-3 px-2 py-3">
              <img
                src=""
                alt="Profile"
                className="w-10 h-10 rounded-full ring-1 ring-orange-500"
              />
            </div>
          </div>
        </>

        {/* <PrimaryButton label={"Purchase"} disabled={!true}></PrimaryButton> */}
      </div>
    </div>
  );
};

export default Navbar;
