import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../contexts/auth-context";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            JobTrack
          </span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`transition-colors hover:text-blue-600 ${
              location.pathname === "/" ? "text-blue-600 font-medium" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/companies"
            className={`transition-colors hover:text-blue-600 ${
              location.pathname.includes("/companies")
                ? "text-blue-600 font-medium"
                : ""
            }`}
          >
            Companies
          </Link>
          <Link
            to="/jobs"
            className={`transition-colors hover:text-blue-600 ${
              location.pathname.includes("/jobs")
                ? "text-blue-600 font-medium"
                : ""
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/blog"
            className={`transition-colors hover:text-blue-600 ${
              location.pathname.includes("/blog")
                ? "text-blue-600 font-medium"
                : ""
            }`}
          >
            Career Tips
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img 
                    src={currentUser.photoURL || null} 
                    alt={currentUser.name} 
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`;
                    }}
                  />
                </div>
              </label>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-56 mt-4">
                <li className="p-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="text-xs text-gray-500">{currentUser.email}</span>
                  </div>
                </li>
                <li><Link to="/profile"><i className="fa-regular fa-user mr-2"></i> My Profile</Link></li>
                <li><a onClick={logout}><i className="fa-solid fa-right-from-bracket mr-2"></i> Log out</a></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost flex items-center">
                <i className="fa-solid fa-right-to-bracket mr-2"></i>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                <i className="fa-solid fa-user-plus mr-2"></i>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 md:hidden">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`transition-colors hover:text-blue-600 ${
                  location.pathname === "/" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/companies"
                className={`transition-colors hover:text-blue-600 ${
                  location.pathname.includes("/companies")
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/jobs"
                className={`transition-colors hover:text-blue-600 ${
                  location.pathname.includes("/jobs")
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/blog"
                className={`transition-colors hover:text-blue-600 ${
                  location.pathname.includes("/blog")
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Career Tips
              </Link>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {currentUser ? (
                  <>
                    <div className="flex items-center mb-3">
                      <img 
                        src={currentUser.photoURL || null} 
                        alt={currentUser.name} 
                        className="w-8 h-8 rounded-full mr-2"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`;
                        }}
                      />
                      <div>
                        <p className="font-medium text-sm">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block py-2 text-blue-600 hover:text-blue-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fa-regular fa-user mr-2"></i> My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      <i className="fa-solid fa-right-from-bracket mr-2"></i> Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="btn btn-outline btn-primary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fa-solid fa-right-to-bracket mr-2"></i> Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fa-solid fa-user-plus mr-2"></i> Register
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;