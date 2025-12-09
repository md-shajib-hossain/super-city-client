import React from "react";
import { useLoaderData } from "react-router-dom";
import IssueCard from "./IssueCard";

const All_Issues = () => {
  const issues = useLoaderData();
  console.log(issues, "issue got");
  return (
    <>
      <div className="md:text-3xl lg:text-5xl font-bold text-center text-primary">
        <h1>All Issues</h1>
      </div>
      <div>
        <p>
          Total issue found{" "}
          <strong className="text-primary">({issues.length})</strong>{" "}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {issues.map((issue) => (
          <IssueCard issue={issue}></IssueCard>
        ))}
      </div>
    </>
  );
};

export default All_Issues;
