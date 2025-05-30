import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  User,
  Book,
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-xl rounded-2xl mx-2 mt-4 mb-4 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-2xl font-bold tracking-wider animate-fade-in">
          📚 <span>Library.Io</span>
        </div>

        <ul className="hidden md:flex items-center space-x-6 text-base font-medium animate-fade-in-down">
          <NavLink to="/" icon={<Home size={18} />}>Home</NavLink>
          <NavLink to="/searchitem" icon={<Search size={18} />}>Search</NavLink>
          <NavLink to="/allbooks" icon={<Book size={18} />}>All Books</NavLink>
          <NavLink to="/wishlist" icon={<ShoppingCart size={18} />}>Wishlist</NavLink>
          <NavLink to="/profile" icon={<User size={18} />}>Profile</NavLink>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none text-white transition-transform duration-300 transform hover:scale-110"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 animate-slide-down-fast">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4 shadow-inner transition-all duration-300">
            <Search size={18} className="text-white" />
            <input
              className="bg-transparent text-white placeholder-white outline-none w-full"
              type="text"
              placeholder="Search..."
            />
          </div>

          <MobileNavLink to="/" icon={<Home size={18} />} setMenuOpen={setMenuOpen}>Home</MobileNavLink>
          <MobileNavLink to="/searchitem" icon={<Search size={18} />} setMenuOpen={setMenuOpen}>Search</MobileNavLink>
          <MobileNavLink to="/allbooks" icon={<Book size={18} />} setMenuOpen={setMenuOpen}>All Books</MobileNavLink>
          <MobileNavLink to="/wishlist" icon={<ShoppingCart size={18} />} setMenuOpen={setMenuOpen}>Wishlist</MobileNavLink>
          <MobileNavLink to="/profile" icon={<User size={18} />} setMenuOpen={setMenuOpen}>Profile</MobileNavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, icon, children }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 hover:text-white transition-all duration-300"
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}

function MobileNavLink({ to, icon, children, setMenuOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
    >
      {icon}
      <span className="text-base font-medium">{children}</span>
    </Link>
  );
}