import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FaHeading,
  FaRegFileAlt,
  FaMapMarkerAlt,
  FaImage,
  FaCrown,
  FaCloudUploadAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../MyHooks/useAuth";
import { imageUpload } from "../../utils/custom";
import useAxiosSecure from "../../AxiosSecure/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Error from "../../pages/Error/ErrorPage";

export default function ReportIssue() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //image preview system in form
  const [preview, setPreview] = useState(null);
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // useQuery for fetching user data from db
  const { data: userData = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(user);
  // useMutation hook for post data in db
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post("/all-issues/create-new-issue", payload),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("Issue Reported successfully");
      // navigate to my inventory page
      mutationReset();
      // Query key invalidate
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });
  // check free users limit
  const isPremium = userData[0]?.isPremium;
  const totalIssues = userData[0]?.totalIssues;
  const maxFreeIssues = userData[0]?.maxFreeIssues;
  const isLimitReached = !isPremium && totalIssues >= maxFreeIssues;
  const onSubmit = async (data) => {
    if (isLimitReached) return;
    const { title, description, category, image, location } = data;
    const imageFile = image[0];
    try {
      // upload image for hosting using img bb
      const imageURL = await imageUpload(imageFile);
      // ===== DUMMY DB SAVE =====
      const issueData = {
        title,
        description,
        category,
        photos: [imageURL],
        location: { address: location },
        createdBy: {
          name: user.displayName,
          creatorEmail: user.email,
          avatar: user.photoURL || "user image",
        },
        assignedStaff: "",
        status: "Pending",
        isBoosted: false,
        createdAt: new Date(),
      };
      await mutateAsync(issueData);
      // reset form & redirect
      reset();
      setPreview(null);
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  if (isPending || userDataLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Report an Issue
        </h1>
        <p className="text-lg text-gray-600">
          Submit a civic issue for authority action & tracking
        </p>
      </div>

      {/* LIMIT WARNING */}
      {isLimitReached && (
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-amber-50 border border-amber-300 rounded-0 p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-amber-800 font-medium">
              You have reached the free issue limit (3 issues).
            </p>
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaCrown className="text-xl" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="max-w-5xl mx-auto">
        <div
          className={`bg-white rounded-0 shadow-2xl p-8 lg:p-12 ${
            isLimitReached ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                  <FaHeading className="text-primary text-xl" />
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Street light not working"
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-0 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-lg">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-0 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition"
                >
                  <option value="">Select category</option>
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
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description – full width */}
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                  <FaRegFileAlt className="text-primary text-xl" />
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Describe the issue in detail..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-0 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Upload Image */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                  <FaImage className="text-primary text-xl" />
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Image is required",
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) setPreview(URL.createObjectURL(file));
                    },
                  })}
                  id="issue-image"
                  className="hidden"
                />
                <label
                  htmlFor="issue-image"
                  className="flex items-center justify-center gap-3 px-6 py-12 border-2 border-dashed border-gray-400 rounded-0 cursor-pointer hover:border-primary hover:bg-primary/5 transition"
                >
                  <FaCloudUploadAlt className="text-4xl text-gray-500" />
                  <div className="text-center">
                    <p className="font-medium text-gray-700">Click to upload</p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                  </div>
                </label>

                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-w-md h-64 object-cover rounded-0 shadow-lg"
                    />
                  </div>
                )}

                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Area / Street name"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-0 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                disabled={isPending}
                className="px-12 py-4 bg-primary text-white font-bold text-lg rounded-0 shadow-lg hover:shadow-xl hover:bg-primary/90 transition transform hover:-translate-y-1 disabled:opacity-70"
              >
                {isPending ? "Submitting..." : "Submit Issue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
