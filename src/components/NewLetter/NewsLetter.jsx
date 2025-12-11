import { Mail, Send } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="py-20 bg-linear-to-r from-orange-600 to-orange-500">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Icon + Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6">
            <Mail size={40} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Get weekly updates on the most upvoted issues, newly resolved
            problems, and how your city is improving — straight to your inbox.
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 text-lg rounded-0 bg-white/90 backdrop-blur text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-0 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <Send size={22} />
              Subscribe Now
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-orange-100 text-sm">
            No spam ever • Unsubscribe anytime • 10,000+ citizens already
            subscribed
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
