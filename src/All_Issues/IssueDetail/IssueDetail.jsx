import React from "react";
import useAuth from "../../MyHooks/useAuth";
import useAxiosSecure from "../../AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";

const IssueDetail = () => {
  const { id } = useParams();
  console.log(typeof id, "type of id");
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isseDetail = [] } = useQuery({
    queryKey: ["issueDetail"],
    queryFn: async () => {
      const res = axiosSecure.get(`/issue/${id}`);
      const data = res.data;
      console.log(data, "axios data");
      return isseDetail;
    },
  });
  console.log(isseDetail, "bahire data ");
  if (loading) {
    return <Loader />;
  }
  return <div></div>;
};

export default IssueDetail;
