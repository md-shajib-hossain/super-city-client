import React from "react";
import Logo from "../Logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import useAuth from "../../MyHooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "from navbar ");
  const { user, logOut } = useAuth();
  // console.log(user);
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
        <NavLink to="dashboard">Tab 2 </NavLink>{" "}
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut().then(() => {
      // console.log(result);
      navigate("/");
      toast("Logged Out Successfull");
    });
  };
  return (
    <div className="navbar max-w-[90%] mx-auto py-0">
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
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} className="m-1 cursor-pointer">
              <div className="flex items-center space-x-3 px-2 py-3">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full ring-1 ring-orange-500"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-orange-100 rounded-box text-lg z-1 w-52 p-2 shadow-sm"
            >
              {user ? (
                <>
                  <li>
                    <Link>{user.displayName}</Link>
                  </li>
                  <li>
                    <Link>Dashboard</Link>
                  </li>
                  <li>
                    <Link>My Profile</Link>
                  </li>
                  <li className="text-primary" onClick={handleLogOut}>
                    <Link>
                      Log Out <GrLogout></GrLogout>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
            </ul>
          </div>
          <div className=" border-gray-200"></div>
        </>

        {/* <PrimaryButton label={"Purchase"} disabled={!true}></PrimaryButton> */}
      </div>
    </div>
  );
};

export default Navbar;
