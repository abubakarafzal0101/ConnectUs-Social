import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import {
  Home,
  UserCircle,
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { userData } = useContext(UserContext);
  const { handleLogout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Network", path: "/network", icon: <UserCircle size={18} /> },
    { name: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
  ];

  const activeLink = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <span className="text-white font-black text-lg">C</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Connect<span className="text-blue-400">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-2xl backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeLink(link.path)
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeLink(link.path) && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                />
              )}
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {userData ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-1 rounded-full hover:bg-white/10 transition"
              >
                <img
                  src={
                    userData.profilePicture ||
                    "https://ui-avatars.com/api/?background=111&color=fff"
                  }
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown
                  size={14}
                  className={`text-zinc-400 transition ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-2"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-sm text-white font-semibold">
                          {userData.firstName} {userData.lastName}
                        </p>
                        <p className="text-xs text-zinc-400 truncate">
                          {userData.headline || "User"}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/update-profile");
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl"
                      >
                        <Settings size={16} /> Update Profile
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-xl"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm text-zinc-400 hover:text-white px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm"
              >
                Join
              </Link>
            </div>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                    activeLink(link.path)
                      ? "bg-white/10 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
