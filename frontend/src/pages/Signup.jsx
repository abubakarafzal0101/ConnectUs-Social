import React, { useContext, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  User,
  Loader2,
  ChevronRight,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContextProvider";

const Signup = () => {
  // --- 1. State Management (Two-way Binding) ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { handleSignup } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 3. Form Submit Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleSignup(formData);
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 selection:bg-blue-600/30">
      {/* Visual Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[500px]"
      >
        {/* --- Section: Branding & Header --- */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-900/20 mb-4">
            <Globe className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white italic">
            Connect<span className="text-blue-500">Hub</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Join the elite professional community.
          </p>
        </header>

        {/* --- Section: Main Signup Form --- */}
        <main className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/50 p-8 rounded-[2rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Personal Info Heading */}
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-400 ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-400 ml-1">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                  />
                </div>
              </div>
            </div>

            {/* Account Credentials Heading */}
            <div className="flex items-center gap-2 pt-2">
              <Lock className="w-4 h-4 text-blue-500" />
              <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                Credentials
              </h2>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 ml-1">
                Professional Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  required
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                />
              </div>
            </div>

            {/* --- Section: Call to Action --- */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/10 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait cursor-pointer flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Get Started
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </main>

        {/* --- Footer Links --- */}
        <footer className="text-center mt-8 space-y-4">
          <p className="text-zinc-500 text-sm">
            By signing up, you agree to our{" "}
            <span className="text-zinc-300 hover:underline cursor-pointer">
              Terms
            </span>
          </p>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <p className="text-zinc-400 text-sm">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-bold cursor-pointer transition-colors"
            >
              Login here
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Signup;
