import React from "react";
import useAuth from "../../MyHooks/useAuth";
import useAxiosSecure from "../../AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

const IssueDetail = () => {
  const { id } = useParams();
  console.log(typeof id, "type of id", id); // id string
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issueDetail = [], refetch } = useQuery({
    queryKey: ["issueDetail", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue/${id}`);
      const data = res.data.result;
      return data;
    },
  });
  if (loading) {
    return <Loader />;
  }

  // like btn func
  const handleLikes = async (id) => {
    console.log(id, "id pawa dorkar", typeof id);
    const updateLikes = {
      likes: Number(issueDetail.likes),
    };

    const response = await axiosSecure.patch(`/all-issues/${id}`, updateLikes);

    toast.success("You voted this issue ❤️");
    refetch();
    console.log(response);
  };
  // console.log(issueDetail, " issue pawa dorkar");
  return (
    <div>
      <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        {/* Header Card */}
        <div>
          <Link to="/all-issues">
            {" "}
            <button className="text-primary cursor-pointer">
              {" "}
              <ChevronLeft size={44}>Go Back</ChevronLeft>
            </button>{" "}
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Main Image */}
          {issueDetail?.photos?.length > 0 && (
            <div className="relative h-64 md:h-96">
              <img
                src={issueDetail?.photos[0]}
                alt="Waterlogged underpass"
                className="w-full h-full object-cover"
              />
              {/* Status & Priority Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold shadow-md">
                  {issueDetail?.status}
                </span>
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold border border-red-300 shadow-md">
                  {issueDetail?.priority}
                </span>
              </div>
              {/* Likes Badge */}
              <div
                onClick={() => handleLikes(issueDetail._id)}
                className="absolute hover:cursor-pointer hover:scale-105 transition top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
              >
                <svg
                  className="w-6 h-6 text-orange-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-bold text-lg">{issueDetail?.likes}</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {issueDetail?.title}
            </h1>

            {/* Category */}
            <div className="mb-6">
              <span className="inline-block px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                {issueDetail?.category}
              </span>
            </div>

            {/* Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                {issueDetail?.details}
              </h2>
            </div>

            {/* Reporter Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <img
                src={issueDetail?.avatar}
                alt="Tanzila Rahman"
                className="w-16 h-16 rounded-full ring-4 ring-orange-200"
              />
              <div>
                <p className="font-semibold text-gray-800">Reported by</p>
                <p className="text-lg font-bold text-blue-700">
                  {issueDetail?.createdBy?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {issueDetail?.createdBy?.creatorEmail}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-500">Reported on</p>
                <p className="font-medium text-gray-700">
                  {issueDetail?.createdAt}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Location
              </h3>
              {location.address && (
                <p className="font-medium text-gray-800 text-lg mb-2">
                  {issueDetail?.address}
                </p>
              )}
              <p className="text-sm text-gray-600">
                Coordinates: 23.8144° N, 90.4202° E
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
