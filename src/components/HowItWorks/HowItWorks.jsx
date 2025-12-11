import { Megaphone, Camera, MapPin, ThumbsUp, CheckCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Spot an Issue",
      desc: "See a pothole, broken street light, garbage pile, or any public problem in your area?",
      icon: <Megaphone size={32} />,
      color: "from-orange-400 to-orange-600",
    },
    {
      step: "02",
      title: "Take Photos & Location",
      desc: "Snap clear photos and let the app automatically capture the exact location.",
      icon: <Camera size={32} />,
      color: "from-amber-400 to-orange-500",
    },
    {
      step: "03",
      title: "Submit in 30 Seconds",
      desc: "Add a quick title, description, category – and hit submit. No complicated forms!",
      icon: <MapPin size={32} />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      step: "04",
      title: "Upvote & Get Attention",
      desc: "Other citizens can upvote your report. More upvotes = faster action by authorities.",
      icon: <ThumbsUp size={32} />,
      color: "from-orange-500 to-red-500",
    },
    {
      step: "05",
      title: "Track & Celebrate Fix",
      desc: "Get notified when it's in progress or resolved. See the before-after and feel proud!",
      icon: <CheckCircle size={32} />,
      color: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report public issues in under 30 seconds and help make your city
            better – together.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-16">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
                {/* Step Number Background */}
                <div className="absolute -top-6 -left-4 text-8xl font-black text-gray-50 select-none">
                  {item.step}
                </div>

                {/* Icon Circle */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl mb-6 mx-auto`}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {item.desc}
                </p>

                {/* Arrow for large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2 text-gray-300">
                    <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                      <path
                        d="M0 20 H60 L70 20 L60 5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M0 20 H60 L70 20 L60 35"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <Link to="/all-issues">
          <button className="flex mt-12 mx-auto justify-center items-center gap-4 bg-primary text-white font-bold py-4 px-12 rounded-0 text-lg shadow-xl hover:shadow-2xl transition ease-in-out duration-300 hover:scale-105 mb-12">
            Report an Issue <FaArrowRight size={18}></FaArrowRight>
          </button>
        </Link> */}
      </div>
    </section>
  );
};

export default HowItWorks;
