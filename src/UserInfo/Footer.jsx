import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Left Side */}
          <div>
            <h2 className="text-xl font-bold">Library App</h2>
            <p className="text-sm mt-1">Empowering knowledge, one book at a time.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a href="/" className="hover:text-teal-200 transition">Home</a>
            <a href="/about" className="hover:text-teal-200 transition">About</a>
            <a href="/contact" className="hover:text-teal-200 transition">Contact</a>
            <a href="/profile" className="hover:text-teal-200 transition">Profile</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-teal-200 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-teal-500 mt-6 pt-4 text-sm text-center">
          &copy; {new Date().getFullYear()} Library App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
