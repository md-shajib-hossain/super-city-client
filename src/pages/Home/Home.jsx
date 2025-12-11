import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
// import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner";
import useAuth from "../../MyHooks/useAuth";
import Loader from "../../components/Loader";
import ResolvedIssue from "../../components/ResolvedIssue/ResolvedIssue";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import FAQ from "../../components/FAQ/FAQ";

const Home = () => {
  const { loading } = useAuth();
  if (loading) {
    <Loader></Loader>;
  }
  return (
    <>
      <Banner></Banner>
      <ResolvedIssue></ResolvedIssue>
      <FeatureSection></FeatureSection>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
    </>
  );
};

export default Home;
