import React from "react";
import IssueCard from "./IssueCard";
import useAuth from "../MyHooks/useAuth";
import Loader from "../components/Loader";
import { easeInOut, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const All_Issues = () => {
  const axiosSecure = useAxiosSecure();

  const { user, loading } = useAuth();

  const { data: allIssue = [] } = useQuery({
    queryKey: ["allIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-issues");
      const data = res.data;
      return data;
    },
  });
  console.log(allIssue, "ebaar maybe paisi");
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
            <strong className="text-primary">({allIssue.length})</strong>{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] md:w-full lg:grid-cols-4 gap-4 space-y-6 my-10 max-w-7xl mx-auto">
          {allIssue.map((issue) => (
            <IssueCard key={issue.no} issue={issue}></IssueCard>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default All_Issues;
