import React, { useState, useEffect, useMemo } from "react";
import Axiosinstance, { BASE_URL } from "./Axiosinstance";
import { Search } from "lucide-react";

export default function Searchitem() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [search, setSearch] = useState("");
  const api = Axiosinstance();

  useEffect(() => {
    async function Getdata() {
      try {
        const res = await api.get("/api/books/");
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Data Not Found...");
      } finally {
        setLoading(false);
      }
    }
    Getdata();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredBooks = useMemo(() => {
    if (!debouncedSearch) return [];
    return book.filter((e) =>
      e.name.toLowerCase().includes(debouncedSearch)
    );
  }, [debouncedSearch, book]);

  const isSearchEmpty = debouncedSearch === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 py-6 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center">
      
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md focus-within:ring-2 focus-within:ring-green-400 transition">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your favorite book..."
          />
        </div>
      </div>

      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-md p-6 sm:p-8 text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-3">
          🔍 Search Results
        </h1>
      </div>

      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-center text-lg text-gray-700 font-semibold">
            <svg
              className="animate-spin h-8 w-8 text-green-500 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            ⏳ Loading books...
          </div>
        ) : isSearchEmpty ? (
          <div className="text-center text-gray-600 text-base sm:text-lg font-medium">
            ✨ Start typing to search for books you love!
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            📭 No books match your search. Try something else!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
              >
                <img
                  className="w-full h-48 object-cover rounded-xl mb-3"
                  src={
                    e.image?.startsWith("http")
                      ? e.image
                      : `${BASE_URL}${e.image}`
                  }
                  alt={e.name}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {e.name}
                </h3>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span className="text-green-600 font-bold">₹{e.price}</span>
                  <span>★★★★☆</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{e.description}</p>
                <div className="flex justify-between mt-3">
                  <button className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 text-sm">
                    Buy Now
                  </button>
                  <button className="bg-gray-100 px-3 py-1.5 rounded-lg text-gray-700 text-sm">
                    ♥
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
