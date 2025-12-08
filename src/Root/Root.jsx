import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";
// import Home from "../pages/Home/Home";

const Root = () => {
  return (
    <div>
      <div className="bg-orange-100">
        <Navbar></Navbar>
      </div>
      <Outlet />
      <div className="max-w-7xl mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Root;
