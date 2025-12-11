import { Eye, MapPin, ThumbsUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const IssueCard = ({ issue }) => {
  console.log(issue, "from card");

  //   distructure properties from issue
  const {
    _id,
    title,
    category,
    status,
    priority,
    location,
    photos,
    likes = 0,
  } = issue;
  // Status Badge Color
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  // Priority Badge
  const priorityColors = {
    high: "bg-red-100 text-red-700 border border-red-300",
    medium: "bg-orange-100 text-orange-700 border border-orange-300",
    low: "bg-gray-100 text-gray-600",
  };
  return (
    <div className="bg-white shadow-lg overflow-hidden hover:shadow-orange-300 hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={photos[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Status Badge on Top Right */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              statusColors[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Category & Priority */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-sm font-medium bg-blue-50 px-3 rounded-full text-gray-600">
            {category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              priorityColors[priority] || priorityColors.medium
            }`}
          >
            {priority === "high"
              ? "High Priority"
              : priority === "medium"
              ? "Normal"
              : "Low"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-400 mb-4">
          <MapPin size={16} className="text-orange-500" />
          <span className="text-sm ml-1 truncate">{location.address}</span>
        </div>

        {/* Footer: Upvote + View Button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {/* Upvote */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition group">
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-orange-50 transition">
              <ThumbsUp size={18} className="group-hover:fill-orange-600" />
            </div>
            <span className="font-semibold">{likes}</span>
          </button>

          {/* View Details Button */}
          <Link
            to={`/issue/${_id}`}
            className="flex items-center gap-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm  transition transform hover:scale-105"
          >
            <Eye size={18} />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
