import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-400">FilmFlare</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary-400 transition">Home</Link>
            <Link to="/movies" className="hover:text-primary-400 transition">Movies</Link>
            <Link to="/blog" className="hover:text-primary-400 transition">Blog</Link>
            <Link to="/about" className="hover:text-primary-400 transition">About</Link>
            <Link to="/contact" className="hover:text-primary-400 transition">Contact</Link>
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-primary-400 transition">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded transition">
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-primary-400 transition">Home</Link>
            <Link to="/movies" className="block py-2 hover:text-primary-400 transition">Movies</Link>
            <Link to="/blog" className="block py-2 hover:text-primary-400 transition">Blog</Link>
            <Link to="/about" className="block py-2 hover:text-primary-400 transition">About</Link>
            <Link to="/contact" className="block py-2 hover:text-primary-400 transition">Contact</Link>
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="block py-2 hover:text-primary-400 transition">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="block py-2 text-primary-400 hover:text-primary-300 transition">
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

