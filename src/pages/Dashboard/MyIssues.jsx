import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Heart,
  Tag,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Filter,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import useAuth from "../../MyHooks/useAuth";
import useAxiosSecure from "../../AxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, issue: null });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    id: null,
  });

  // Fetch issues from backend
  const { data: issues, isLoading } = useQuery({
    queryKey: ["my-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/my-issues/${user?.email}`);
      return res.data.result;
    },
    enabled: !!user?.email,
  });

  // Edit mutation
  const editMutation = useMutation({
    mutationFn: async (updatedIssue) => {
      const res = await axiosSecure.put(
        `/issues/${updatedIssue._id}`,
        updatedIssue
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-issues"]);
      setEditModal({ isOpen: false, issue: null });
      alert("Issue updated successfully!");
    },
    onError: (error) => {
      alert("Failed to update issue: " + error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/issues/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-issues"]);
      setDeleteConfirm({ isOpen: false, id: null });
      alert("Issue deleted successfully!");
    },
    onError: (error) => {
      alert("Failed to delete issue: " + error.message);
    },
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-300",
      resolved: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-500",
      medium: "bg-orange-500",
      low: "bg-green-500",
    };
    return colors[priority] || "bg-gray-500";
  };

  const StatusIcon = ({ status }) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      "in-progress": <Loader2 className="w-4 h-4 animate-spin" />,
      resolved: <CheckCircle2 className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEdit = (issue) => {
    if (issue.status !== "pending") {
      alert("Only pending issues can be edited!");
      return;
    }
    setEditModal({ isOpen: true, issue: { ...issue } });
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  // const handleViewDetails = (id) => {
  //   `/issues/${id}`;
  // };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editMutation.mutate(editModal.issue);
  };

  // Filter issues
  const filteredIssues = issues?.filter((issue) => {
    const statusMatch = filterStatus === "all" || issue.status === filterStatus;
    const categoryMatch =
      filterCategory === "all" || issue.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const categories = [...new Set(issues?.map((i) => i.category) || [])];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Issues
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Total {filteredIssues?.length || 0} issue(s) found
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {showFilters ? (
                <X className="w-5 h-5" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
            </button>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
              showFilters ? "block" : "hidden md:grid"
            }`}
          >
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!filteredIssues || filteredIssues.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
            <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              No Issues Found
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              {filterStatus !== "all" || filterCategory !== "all"
                ? "Try changing your filters"
                : "You haven't reported any issues yet"}
            </p>
          </div>
        ) : (
          /* Issues Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* Image */}
                {issue.photos && issue.photos.length > 0 ? (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={issue.photos[0]}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    {issue.photos.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs md:text-sm flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />+
                        {issue.photos.length - 1}
                      </div>
                    )}
                    <div
                      className={`absolute top-2 left-2 w-3 h-3 rounded-full ${getPriorityColor(
                        issue.priority
                      )}`}
                      title={`${issue.priority} priority`}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 md:p-5 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {issue.title}
                  </h3>

                  {/* Details */}
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
                    {issue.details}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Tag className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{issue.category}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {issue.location?.address || "Location not specified"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formatDate(issue.createdAt)}</span>
                    </div>
                  </div>

                  {/* Status & Likes */}
                  <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                        issue.status
                      )}`}
                    >
                      <StatusIcon status={issue.status} />
                      <span className="capitalize">{issue.status}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="text-sm font-medium">{issue.likes}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {issue.status === "pending" && (
                      <button
                        onClick={() => handleEdit(issue)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-xs md:text-sm font-medium"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(issue._id)}
                      disabled={deleteMutation.isPending}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-xs md:text-sm font-medium disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>

                    <Link to={`/issue/${issue._id}`}>
                      <button
                        // onClick={() => handleViewDetails(issue._id)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition text-xs md:text-sm font-medium ${
                          issue.status === "pending" ? "" : "col-span-2"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Edit Issue
                </h2>
                <button
                  onClick={() => setEditModal({ isOpen: false, issue: null })}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className="p-4 md:p-6 space-y-4"
              >
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editModal.issue.title}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        issue: { ...editModal.issue, title: e.target.value },
                      })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Details *
                  </label>
                  <textarea
                    value={editModal.issue.details}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        issue: { ...editModal.issue, details: e.target.value },
                      })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={editModal.issue.category}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          issue: {
                            ...editModal.issue,
                            category: e.target.value,
                          },
                        })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      value={editModal.issue.priority}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          issue: {
                            ...editModal.issue,
                            priority: e.target.value,
                          },
                        })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editModal.issue.location?.address || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        issue: {
                          ...editModal.issue,
                          location: {
                            ...editModal.issue.location,
                            address: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModal({ isOpen: false, issue: null })}
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editMutation.isPending}
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition font-medium flex items-center justify-center gap-2"
                  >
                    {editMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Issue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Issue
                  </h3>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this issue? All associated data
                will be permanently removed.
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={() => setDeleteConfirm({ isOpen: false, id: null })}
                  className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                  disabled={deleteMutation.isPending}
                  className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition font-medium flex items-center justify-center gap-2"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Issue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;
