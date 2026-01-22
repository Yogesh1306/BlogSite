import {
  X,
  Search,
  LightMode,
  DarkMode,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import { NavLink } from "react-router";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { useTheme } from "../../context/ThemeContext";
import SearchModal from "../ui/SearchModal";

const Navbar = () => {
  const publicPath = "http://localhost:3000/";
  const [showDrop, setShowDrop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, dispatch } = useContext(Context);
  const { theme, toggleTheme, isDark } = useTheme();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/write", label: "Write" },
  ];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300 ">
      <div className="relative>">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Yogesh1306"
                target="_blank"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
              >
                <GitHub className="w-5 h-5"/>
              </a>
              <a
                href="https://x.com/joshiyogesh24"
                target="_blank"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/yogeshjoshi13"
                target="_blank"
                className="text-gray-500 hover:text-pink-500 transition-colors duration-200 p-2 rounded-full hover:bg-pink-50"
              >
                <LinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <span className="font-secondary text-2xl font-bold text-gradient">
                Blog
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `font-secondary text-lg font-medium transition-all duration-200 relative group ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <LightMode className="w-5 h-5" />
              ) : (
                <DarkMode className="w-5 h-5" />
              )}
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Controls */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDrop(!showDrop)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    src={(publicPath + user?.userData.profileImg)}
                    alt={user?.userData.username}
                  />
                  <span className="hidden sm:block font-medium text-gray-700">
                    {user?.userData.username}
                  </span>
                </button>

                {/* User Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-200 transform ${
                    showDrop
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="font-secondary font-semibold text-gray-900">
                      {user?.userData.username}
                    </div>
                    <div className="font-primary text-sm text-gray-500 truncate">
                      {user?.userData.email}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setShowDrop(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setShowDrop(false)}
                    >
                      Settings
                    </NavLink>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDrop(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/login"
                  className="font-secondary font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn-primary font-secondary px-4 py-2 text-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-4 space-y-3 bg-gray-50 border-t border-gray-200">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg font-secondary font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-white"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-center font-secondary font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-3 py-2 text-center btn-primary font-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={` w-[40vw] min-h-[40vh] border bg-white rounded-2xl p-2 transition-all absolute top-16 right-0 ${isSearchOpen ? "" : "hidden"}`}
        onMouseLeave={()=>setIsSearchOpen(false)}
      >
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
