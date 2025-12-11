// components/FeaturesSection.jsx
import {
  AlertTriangle,
  MapPin,
  Camera,
  Clock,
  CheckCircle2,
  Users,
  Smartphone,
  BellRing,
} from "lucide-react";

const features = [
  {
    icon: <Camera className="w-10 h-10 text-red-500" />,
    title: "Report in 30 Seconds",
    description:
      "Just take a photo, add location & description — issue reported instantly.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-blue-500" />,
    title: "Auto GPS Location",
    description:
      "No need to type address. Your exact location is captured automatically.",
  },
  {
    icon: <AlertTriangle className="w-10 h-10 text-orange-500" />,
    title: "Multiple Categories",
    description:
      "Potholes, street lights, garbage, drainage, illegal parking, water logging & more.",
  },
  {
    icon: <Clock className="w-10 h-10 text-purple-500" />,
    title: "Live Status Tracking",
    description:
      "See real-time updates: Reported → Assigned → In Progress → Resolved.",
  },
  {
    icon: <BellRing className="w-10 h-10 text-green-500" />,
    title: "Push & Email Notifications",
    description:
      "Get notified when your reported issue is acknowledged or fixed.",
  },
  {
    icon: <CheckCircle2 className="w-10 h-10 text-teal-500" />,
    title: "Verify & Vote",
    description:
      "Other citizens can upvote or confirm the same issue to increase priority.",
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-500" />,
    title: "Authority Dashboard",
    description:
      "Municipal officers get a powerful panel to assign teams and track progress.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-pink-500" />,
    title: "100% Mobile Friendly",
    description:
      "Works perfectly on Android, iPhone, and web — no app download needed.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Fix Your City Together
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            A simple, transparent, and powerful platform that connects citizens
            with local authorities to solve infrastructure problems quickly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100"
            >
              <div className="mb-6 inline-flex p-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            Report an Issue Now – It's Free
          </button>
        </div> */}
      </div>
    </section>
  );
};
export default FeatureSection;
