import React, { useState } from "react";
import IssueCard from "./IssueCard";
import useAuth from "../MyHooks/useAuth";
import Loader from "../components/Loader";
import { easeInOut, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDebounce from "../MyHooks/useDebounce";

const All_Issues = () => {
  const axiosSecure = useAxiosSecure();
  // এটাই ম্যাজিক! ৬০০ms পর্যন্ত অপেক্ষা করবে

  const { user, loading } = useAuth();

  const limit = 8;

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  // Fetch Data with TanStack Query
  const { data = { result: [], total: 0 }, isLoading } = useQuery({
    queryKey: [
      "allIssues",
      currentPage,
      searchTerm,
      selectedStatus,
      selectedPriority,
      selectedCategory,
      debouncedSearchTerm,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        skip: (currentPage * limit).toString(),
      });
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      if (searchTerm) params.append("search", searchTerm);
      if (selectedStatus) params.append("status", selectedStatus);
      if (selectedPriority) params.append("priority", selectedPriority);
      if (selectedCategory) params.append("category", selectedCategory);

      const res = await axiosSecure.get(`/all-issues?${params}`);
      return res.data; // { result: [], total: 120 }
    },
    keepPreviousData: true,
  });

  const issues = data.result || [];
  const totalItems = data.total || 0;
  const totalPages = Math.ceil(totalItems / limit);
  const pageNumbers = [...Array(totalPages).keys()];

  // Reset to first page when filter changes
  const resetPage = () => setCurrentPage(0);

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="max-w-[1400px] mx-auto ">
        <div className="md:text-3xl lg:text-5xl font-bold text-center mt-10">
          <h1>
            All <span className="text-primary">Issues</span>
          </h1>
        </div>

        <div className="text-center my-4">
          <p>
            Total issue found{" "}
            <strong className="text-primary">({totalItems})</strong>
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex  p-5 gap-2 border-none bg-blue-50 rounded-lg my-12 items-center justify-between">
          {/* Search */}
          <div className="w-full">
            <label className="input input-primary input-bordereds flex items-center gap-2">
              <svg
                className="h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="text"
                className="grow "
                placeholder="Search by title,category or location"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </label>
          </div>

          {/* Status Filter */}
          <div className="w-full ">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                resetPage();
              }}
              className="select select-primary appearance-none w-full"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="w-full">
            <select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value);
                resetPage();
              }}
              className="select select-primary appearance-none w-full"
            >
              <option value="">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full ">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                resetPage();
              }}
              className="select select-primary appearance-none w-full"
            >
              <option value="">All Categories</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Street Light">Street Light</option>
              <option value="Drainage">Drainage</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Encroachment">Encroachment</option>
              <option value="Road Safety">Road Safety</option>
              <option value="Road Blockage">Road Blockage</option>
              <option value="Traffic Safety">Traffic Safety</option>
              <option value="Park Maintenance">Park Maintenance</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Animal Control">Animal Control</option>
              <option value="Public Facility">Public Facility</option>
              <option value="Traffic Signal">Traffic Signal</option>
            </select>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {issues.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 text-xl">
              No Issue Found !
            </div>
          ) : (
            issues.map((issue) => (
              <IssueCard key={issue._id || issue.no} issue={issue} />
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pb-16 flex-wrap">
          {/* Previous Button */}
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn hover:bg-primary rounded-full h-14 w-14"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Page Numbers */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn rounded-full w-14 h-14 ${
                currentPage === num ? "bg-primary text-white" : "bg-base-200"
              } border-2`}
            >
              {num + 1}
            </button>
          ))}

          {/* Next Button */}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn hover:bg-primary rounded-full h-14 w-14"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default All_Issues;
