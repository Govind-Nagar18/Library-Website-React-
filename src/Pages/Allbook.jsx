import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Axiosinstance, {BASE_URL} from "./Axiosinstance";

export default function Allbooks({ setcart }) {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = Axiosinstance();

  useEffect(() => {
    async function Getdata() {
      try {
        const res = await api.get("/api/books/"); 
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Data Not Found...");
      } finally {
        setLoading(false);
      }
    }

    Getdata();
  }, []);

  function addcart(bookitem) {
    setcart((prev) => [...prev, bookitem]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 py-8 px-4 sm:px-6 md:px-10 flex flex-col items-center">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-md p-6 sm:p-8 text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-3">
          📚 Explore Our Book Collection
        </h1>
        <p className="text-gray-700 text-base sm:text-lg">
          Expand your knowledge, fuel your curiosity, and dive into new ideas.
          Whether you're into science, stories, or self-growth, there's
          something for everyone!
        </p>
      </div>

      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="text-center text-lg text-gray-700 font-semibold">
            ⏳ Loading books...
          </div>
        ) : book.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            📭 No books found. Please check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {book.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
              >
                <img
                  src={
                    e.image.startsWith("http")
                      ? e.image
                      : `${BASE_URL}${e.image}`
                  }
                  alt={e.name}
                  className="h-52 w-full object-cover rounded-xl mb-4 border"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-green-600 mb-1">
                  {e.name}
                </h2>
                <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                  {e.descriptions?.slice(0, 100)}...
                </p>
                <p className="text-lg font-bold text-green-700 mb-3">
                  ₹{e.price}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl text-sm">
                    Buy
                  </button>
                  <button
                    onClick={() => addcart(e)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm flex items-center justify-center"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Wishlist
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
