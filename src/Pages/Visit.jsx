import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axiosinstance,{BASE_URL} from "./Axiosinstance";

export default function Visit() {
  const api = Axiosinstance();
  let { id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.get("/api/books/");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredBooks = books
    .filter((book) => book.booktype === id)
    .filter((book) => {
      if (filter === "all") return true;
      if (filter === "under500" && book.price < 500) return true;
      if (filter === "500to1000" && book.price >= 500 && book.price <= 1000) return true;
      if (filter === "over1000" && book.price > 1000) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const getCategoryName = () => {
    const categories = {
      fiction: "Fiction",
      nonfiction: "Non-Fiction",
      mystery: "Mystery & Thriller",
      scifi: "Science Fiction",
      romance: "Romance",
      biography: "Biography",
    };
    return categories[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen p-4 sm:p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-2">
          {getCategoryName()} Books
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the best of {getCategoryName().toLowerCase()} books curated just for you.
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Filter by:</span>
          <select 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="under500">Under ₹500</option>
            <option value="500to1000">₹500 - ₹1000</option>
            <option value="over1000">Over ₹1000</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Sort by:</span>
          <select 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-lg text-center">
          <img src="/api/placeholder/200/200" alt="No books" className="mb-4 w-32 h-32" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">No Books Found</h2>
          <p className="text-gray-600">Try changing your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64 group">
                <img
                  src={`${BASE_URL}${book.image}`}
                  alt={book.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/api/placeholder/400/320")}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                    onClick={() => setSelectedBook(book)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{book.name}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span className="text-green-600 font-bold">₹{book.price}</span>
                  <span>★★★★☆</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                <div className="flex justify-between mt-3">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm">
                    Buy Now
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm">♥</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={`http://127.0.0.1:8000/${selectedBook.image}`}
                  alt={selectedBook.name}
                  className="w-full h-64 md:h-full object-cover"
                  onError={(e) => (e.target.src = "/api/placeholder/400/500")}
                />
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold">{selectedBook.name}</h2>
                  <button onClick={() => setSelectedBook(null)}>✕</button>
                </div>
                <p className="text-green-600 font-bold text-xl mb-2">₹{selectedBook.price}</p>
                <p className="mb-4 text-gray-700">{selectedBook.description}</p>
                <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                  <li>Premium quality pages</li>
                  <li>Available in hardcover and paperback</li>
                  <li>Publisher: {selectedBook.publisher || "Premium Publishers"}</li>
                  <li>Language: English</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Add to Cart
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 bg-green-600 text-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
        <p className="mb-4">Subscribe to get updates on new books and special offers.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-black w-full"
          />
          <button className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600 font-bold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
