import { useState } from "react";
import { MapPin, Upload, X, Loader2 } from "lucide-react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    category: "",
    priority: "medium",
    address: "",
    lat: "",
    lng: "",
  });

  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const categories = [
    "Road Damage",
    "Street Light",
    "Drainage",
    "Waste Management",
    "Encroachment",
    "Park Maintenance",
    "Traffic Safety",
    "Road Safety",
    "Road Blockage",
    "Water Supply",
    "Public Facility",
  ];

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5)); // Max 5 photos
  };

  // Remove photo
  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding using Nominatim (OpenStreetMap)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setFormData({
            ...formData,
            lat: latitude.toFixed(6),
            lng: longitude.toFixed(6),
            address: data.display_name || "Location fetched",
          });
        } catch (err) {
          setFormData({
            ...formData,
            lat: latitude.toFixed(6),
            lng: longitude.toFixed(6),
            address: "Location fetched (address not available)",
          });
        }
        setIsGettingLocation(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsGettingLocation(false);
      }
    );
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || photos.length === 0) {
      alert("Please fill all required fields and add at least one photo");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitted:", { formData, photos });
    alert("Issue reported successfully!");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-amber-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Report a Public Issue
          </h1>
          <p className="text-orange-200">
            Help make your city better – your report matters
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          {/* Title */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Issue Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Large pothole on main road"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          {/* Details */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Description *
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the issue in detail..."
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="text-gray-700">
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-white font-medium mb-2">
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High (Urgent)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Location *
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter address or use current location"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium flex items-center gap-2 transition"
              >
                {isGettingLocation ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <MapPin size={20} />
                )}
                {isGettingLocation ? "Getting..." : "Use My Location"}
              </button>
            </div>
            {(formData.lat || formData.lng) && (
              <p className="text-orange-200 text-sm mt-2">
                Lat: {formData.lat}, Lng: {formData.lng}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <label className="block text-white font-medium mb-3">
              Photos (Max 5) *
            </label>
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <div className="border-2 border-dashed border-orange-500 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition">
                <Upload className="mx-auto mb-3 text-orange-400" size={40} />
                <p className="text-white">Click to upload photos</p>
                <p className="text-orange-300 text-sm mt-1">Up to 5 images</p>
              </div>
            </label>

            {/* Photo Previews */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Submitting Report...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
