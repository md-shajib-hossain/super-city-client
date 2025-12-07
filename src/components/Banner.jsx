import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Report Issues Instantly",
    subtitle:
      "Help make your city better – report potholes, broken lights, garbage in just 30 seconds",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80&fit=crop",
    badge: "Fast & Easy",
  },
  {
    id: 2,
    title: "Track Progress Live",
    subtitle:
      "See real-time updates when authorities respond and fix reported issues",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&fit=crop",
    badge: "Transparency",
  },
  {
    id: 3,
    title: "Together We Fix Faster",
    subtitle:
      "Join thousands of citizens already improving public infrastructure",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&fit=crop",
    badge: "Community Power",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 sec (3 sec show + 1 sec transition)

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-96 md:h-screen max-h-screen overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-start px-6 md:px-16 lg:px-24">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <div className="inline-block px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-none text-sm font-semibold mb-4">
                {slides[currentIndex].badge}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                {slides[currentIndex].title}
              </h1>

              <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-xl">
                {slides[currentIndex].subtitle}
              </p>

              <div className="flex gap-4">
                <button className="cursor-pointer px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-none shadow-lg transform hover:scale-105 transition duration-300">
                  Report an Issue
                </button>
                <button className="cursor-pointer px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-none hover:bg-white/30 transition">
                  View All Issues
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-none transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-500 w-10"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
