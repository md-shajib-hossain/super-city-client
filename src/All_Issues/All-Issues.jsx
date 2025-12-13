import React, { useState, useEffect, useRef } from "react";
import IssueCard from "./IssueCard";
import useAuth from "../MyHooks/useAuth";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDebounce from "../MyHooks/useDebounce";

const All_Issues = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const limit = 8;
  const inputRef = useRef(null);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, selectedStatus, selectedPriority, selectedCategory]);

  // Fetch Data with TanStack Query
  const {
    data = { result: [], total: 0 },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "allIssues",
      currentPage,
      debouncedSearchTerm,
      selectedStatus,
      selectedPriority,
      selectedCategory,
      user?.email,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit,
        skip: currentPage * limit,
      });

      if (debouncedSearchTerm.trim()) {
        params.append("search", debouncedSearchTerm.trim());
      }
      if (selectedStatus) params.append("status", selectedStatus);
      if (selectedPriority) params.append("priority", selectedPriority);
      if (selectedCategory) params.append("category", selectedCategory);

      const res = await axiosSecure.get(`/all-issues?${params}`);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000,
  });

  const issues = data.result || [];
  const totalItems = data.total || 0;
  const totalPages = Math.ceil(totalItems / limit);
  const pageNumbers = [...Array(totalPages).keys()];

  // Show loader only on initial load
  if (loading || (isLoading && !data.result?.length)) {
    return <Loader />;
  }

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            All <span className="text-primary">Issues</span>
          </h1>
          <p className="mt-6 text-lg">
            Total issue found{" "}
            <strong className="text-primary">({totalItems})</strong>
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
          {/* Search */}
          <div className="input input-bordered input-primary flex items-center gap-3">
            <svg
              className="h-5 w-5 opacity-70"
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
              ref={inputRef}
              type="text"
              className="grow"
              placeholder="Search by title, category or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select select-bordered select-primary w-full"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="select select-bordered select-primary w-full"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered select-primary w-full"
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

        {/* Loading Indicator */}
        {isFetching && (
          <div className="text-center py-4">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        )}

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10">
          {issues.length === 0 ? (
            <div className="col-span-full text-center py-20 text-xl text-gray-500">
              No Issue Found!
            </div>
          ) : (
            issues.map((issue) => (
              <IssueCard
                key={issue._id || issue.no}
                issue={issue}
                searchTerm={debouncedSearchTerm.trim()}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pb-16 flex-wrap">
            {/* Previous Button */}
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-primary rounded-full h-14 w-14"
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
                  currentPage === num ? "btn-primary text-white" : "btn"
                }`}
              >
                {num + 1}
              </button>
            ))}

            {/* Next Button */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-primary rounded-full h-14 w-14"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default All_Issues;
