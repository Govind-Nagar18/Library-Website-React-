import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Heart,
  Eye,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Wishlist({ cart = [], setcart }) {

    const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setWishlistItems(cart);
    }, 1500);
  }, [cart]);

  const filterItems = (filter) => {
    setSelectedFilter(filter);
    if (filter === "all") {
      setWishlistItems(cart);
    } else if (filter === "sale") {
      setWishlistItems(cart.filter((book) => book.price < 500));
    } else if (filter === "topRated") {
      setWishlistItems(cart.filter((book) => book.rating >= 4));
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortedItems = [...wishlistItems];

    if (value === "priceLow") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (value === "priceHigh") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (value === "rating") {
      sortedItems.sort((a, b) => b.rating - a.rating);
    }

    setWishlistItems(sortedItems);
  };

  function removecart(id) {
    setcart((prev) => prev.filter((item) => item.id !== id));
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading your wishlist...
        </p>
      </div>
    );
  }


  // ... Keep all your useState, useEffect, filter, and sort functions the same

  // Component render below (no change in logic, just class updates)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
          My Wishlist
        </h1>

        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-4">
          {/* Filter buttons */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {["all", "sale", "topRated"].map((filter) => (
              <button
                key={filter}
                onClick={() => filterItems(filter)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition duration-300 ${
                  selectedFilter === filter
                    ? filter === "sale"
                      ? "bg-red-600 text-white"
                      : filter === "topRated"
                      ? "bg-yellow-600 text-white"
                      : "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter === "all"
                  ? "All"
                  : filter === "sale"
                  ? "On Sale"
                  : "Top Rated"}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            className="px-4 py-2 w-full sm:w-auto bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Empty Wishlist Message */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 sm:p-8 shadow-lg text-center animate-fadeIn">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full mb-4 sm:mb-6 flex items-center justify-center">
            <Heart size={48} className="text-gray-400 sm:text-5xl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            You haven't added any books to your wishlist yet. Start browsing to find your next favorite read!
          </p>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
            Browse Books <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      ) : (
        <>
          {/* Responsive Book Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((book, index) => (
              <div
                key={book.id || index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition hover:scale-105"
                style={{
                  animation: "fadeInUp 0.5s ease forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="relative h-60 sm:h-64 group">
                  <img
                    className="w-full h-full object-cover transition group-hover:brightness-90"
                    src={`http://127.0.0.1:8000/${book.image}`}
                    alt={book.name || "Book cover"}
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex space-x-3">
                      <button className="bg-white text-gray-800 p-3 rounded-full hover:scale-110">
                        <Eye size={18} />
                      </button>
                      <button className="bg-green-500 text-white p-3 rounded-full hover:scale-110">
                        <ShoppingCart size={18} />
                      </button>
                      <button
                        onClick={() => removecart(book.id)}
                        className="bg-red-500 text-white p-3 rounded-full hover:scale-110"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {book.price < 500 && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        Sale!
                      </span>
                    )}
                    {book.bestseller && (
                      <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {book.name || "Book Title"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {book.author || "Author Name"}
                  </p>

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500">
                        {"★".repeat(Math.floor(book.rating || 4))}
                      </span>
                      <span className="text-gray-400">
                        {"★".repeat(5 - Math.floor(book.rating || 4))}
                      </span>
                      <span className="ml-1 text-gray-600">({book.rating || 4.0})</span>
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>Added 2d ago</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {book.description || "No description available."}
                  </p>

                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{book.price || 499}
                      </span>
                      {book.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₹{book.originalPrice}
                        </span>
                      )}
                    </div>
                    {book.stock <= 5 && book.stock > 0 && (
                      <span className="text-xs text-orange-600">
                        Only {book.stock} left!
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      Buy Now
                    </button>
                    <button
                      onClick={() => removecart(book.id)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fade Animation Style */}
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
