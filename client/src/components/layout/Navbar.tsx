import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Logo = () => (
  <img src="/eventron-logo.svg" alt="EventSync AI Logo" className="h-8 w-8 mr-2" />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "#hero" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-surface shadow-lg" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-transparent">
              EventSync AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors duration-200 text-secondary hover:text-primary`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/signin"
              className="btn border-2 border-btn-gradient-from text-btn-gradient-from font-bold text-sm px-5 py-2 mr-2 hover:bg-btn-gradient-from hover:text-white"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="btn bg-gradient-to-r from-btn-gradient-from to-btn-gradient-to text-white font-bold text-sm px-5 py-2"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        className="md:hidden bg-surface"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-background`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/signin"
            className="block w-full text-center btn border-2 border-btn-gradient-from text-btn-gradient-from font-bold text-sm px-5 py-2 mr-2 hover:bg-btn-gradient-from hover:text-white mt-4"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="block w-full text-center btn bg-gradient-to-r from-btn-gradient-from to-btn-gradient-to text-white font-bold text-sm px-5 py-2 mt-4"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
