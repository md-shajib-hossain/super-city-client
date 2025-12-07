import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password, remember });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-950 to-amber-900">
      {/* Warm Animated Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-32 right-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glassmorphism Card – Orange Tint */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-orange-200">Sign in to continue to PublicFix</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-orange-100 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-white/20 border border-white/30 rounded-xl text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-100 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 bg-white/20 border border-white/30 rounded-xl text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-orange-100">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/20 border-orange-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-orange-300 hover:text-white transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Main Orange Button */}
            <button
              type="submit"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-orange-200">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button – Orange Theme Friendly */}
            <button
              onClick={() => console.log("Google Login")}
              className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 bg-white/15 backdrop-blur-md border border-white/30 rounded-xl text-white font-medium hover:bg-white/25 hover:border-orange-400 transform hover:scale-[1.02] transition-all duration-300"
            >
              <FcGoogle size={26} />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-orange-200">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-white hover:text-orange-300 transition"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
