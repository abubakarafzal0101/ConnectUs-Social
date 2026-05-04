import React, { useContext, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Loader2,
  ChevronRight,
  Globe,
  KeyRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContextProvider";

const Login = () => {
  // --- 1. Form State (Packed into one object) ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Binding Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 3. Submit Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleLogin(formData);
    } catch (error) {
      toast.error(error.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 selection:bg-blue-600/30">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[450px]"
      >
        {/* --- Branding Section --- */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl mb-4 group hover:border-blue-500/50 transition-all duration-500">
            <Globe className="text-blue-500 w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome <span className="text-blue-500">Back</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Continue your professional journey.
          </p>
        </header>

        {/* --- Main Login Form --- */}
        <main className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Group: Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Work Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                />
              </div>
            </div>

            {/* Input Group: Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  required
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm cursor-text placeholder:text-zinc-800"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/10 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {/* Subtle Shimmer Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-zinc-600 font-medium tracking-tighter">
                Secure Login
              </span>
            </div>
          </div>

          {/* Trusted Badge */}
          <div className="flex items-center justify-center gap-2 text-zinc-600">
            <KeyRound className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-widest uppercase">
              End-to-End Encrypted
            </span>
          </div>
        </main>

        {/* Bottom Navigation */}
        <footer className="text-center mt-8">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-400 font-bold cursor-pointer transition-colors"
            >
              Join ConnectHub
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Login;
