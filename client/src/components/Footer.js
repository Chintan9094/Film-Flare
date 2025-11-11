/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">FilmFlare</h3>
            <p className="text-sm">
              Your ultimate destination for movie reviews, news, and trailers.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/movies" className="hover:text-primary-400 transition">Movies</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition">Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary-400 transition">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <p className="text-sm mb-2">Follow us for the latest updates</p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/chintan-rabari-a54a712b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition"
              >
                Linkedin
              </a>
              <a
                href="https://x.com/Chintandesai94"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition"
              >
                Twitter
              </a>
              <a
                href="https://github.com/Chintan9094"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition"
              >
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FilmFlare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
