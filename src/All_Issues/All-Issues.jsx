import React from "react";
import { useLoaderData } from "react-router-dom";
import IssueCard from "./IssueCard";
import useAuth from "../MyHooks/useAuth";
import Loader from "../components/Loader";
import { easeInOut, motion } from "framer-motion";
const All_Issues = () => {
  const issues = useLoaderData();
  const { loading } = useAuth();
  console.log(issues, "issue got");

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeInOut }}
        className="max-w-7xl mx-auto"
      >
        <div className="md:text-3xl lg:text-5xl font-bold text-center text-primary mt-10 ">
          <h1>All Issues</h1>
        </div>
        <div>
          <p>
            Total issue found{" "}
            <strong className="text-primary">({issues.length})</strong>{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] md:w-full lg:grid-cols-4 gap-4 space-y-6 my-10 max-w-7xl mx-auto">
          {issues.map((issue) => (
            <IssueCard key={issue.no} issue={issue}></IssueCard>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default All_Issues;
