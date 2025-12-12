import React, { useState } from "react";
import IssueCard from "./IssueCard";
import useAuth from "../MyHooks/useAuth";
import Loader from "../components/Loader";
import { easeInOut, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { ChevronLeft, ChevronRight } from "lucide-react";

const All_Issues = () => {
  const axiosSecure = useAxiosSecure();
  const limit = 8;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalApps, setTotalApps] = useState(0);

  const { user, loading } = useAuth();

  const {
    data: allIssue = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allIssues", totalPage, currentPage, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-issues?limit=${limit}&skip=${currentPage * limit}`
      );
      const data = res.data.result;
      setTotalApps(res.data.total);
      setTotalPage(Math.ceil(totalApps / limit));
      refetch();
      // console.log(data, "after server change"); // ekhane data paisi. map kaj kortese
      return data;
    },
  });
  console.log(totalPage, "total page");
  if (isLoading) {
    return <Loader></Loader>;
  }

  const needBtn = [...Array(totalPage).keys()];
  console.log(needBtn);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <>
      {/*  */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeInOut }}
        className="max-w-7xl mx-auto"
      >
        <div className="md:text-3xl lg:text-5xl font-bold text-center text-primary mt-10 ">
          <h1>All Issues</h1>
        </div>
        <div>
          <p>
            Total issue found{" "}
            <strong className="text-primary">({totalApps})</strong>{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] md:w-full lg:grid-cols-4 gap-4 space-y-6 my-10 max-w-7xl mx-auto">
          {allIssue.map((issue) => (
            <IssueCard key={issue.no} issue={issue}></IssueCard>
          ))}
        </div>
      </motion.section>

      <div className="flex justify-center gap-4 pb-10">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-20 btn hover:bg-primary rounded-full h-14"
          >
            {" "}
            <ChevronLeft></ChevronLeft>{" "}
          </button>
        )}

        {needBtn.map((btn) => (
          <button
            onClick={() => setCurrentPage(btn)}
            className={`btn ${
              currentPage == btn && "bg-primary text-white"
            }  border-2  rounded-full w-14 h-14 flex`}
          >
            {" "}
            {btn + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="ml-20 btn hover:bg-primary rounded-full h-14"
          >
            {" "}
            <ChevronRight size={24}></ChevronRight>
          </button>
        )}
      </div>
    </>
  );
};

export default All_Issues;
