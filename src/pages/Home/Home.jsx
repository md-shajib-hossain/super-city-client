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
import NewsLetter from "../../components/NewLetter/NewsLetter";

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
      <NewsLetter></NewsLetter>
    </>
  );
};

export default Home;
