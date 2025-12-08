import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
// import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner";
import useAuth from "../../MyHooks/useAuth";
import Loader from "../../components/Loader";

const Home = () => {
  const { loading } = useAuth();
  if (loading) {
    <Loader></Loader>;
  }
  return (
    <>
      <Banner></Banner>
    </>
  );
};

export default Home;
