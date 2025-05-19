import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [Categories] = useState([
    {
      image: "https://tiimg.tistatic.com/fp/1/008/380/hindi-books-for-class-10th-104.jpg",
      name: "Hindi",
      unqname: "Hindi",
    },
    {
      image: "https://marketplace.canva.com/EAFJzck6-rk/1/0/1236w/canva-delicate-minimalist-boho-english-notebook-cover-dGePxG88qPU.jpg",
      name: "English",
      unqname: "English",
    },
    {
      image: "https://marketplace.canva.com/EAFpzM5bvfU/2/0/1236w/canva-blue-and-yellow-illustrative-math-notebook-cover-VcHnH1J3slU.jpg",
      name: "Maths",
      unqname: "Maths",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7l-ICnbfvP5Ky2iH6rF3eIw9Ynvzl4grNDw&s",
      name: "Science",
      unqname: "Science",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAJLTEgY25yz9hjxLDZqNNv_9_zSaoO0I8Q&s",
      name: "History",
      unqname: "History",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoYkSb4dbxPrIG8DvDjgVjs6spyLP3R9SdA&s",
      name: "Biographies",
      unqname: "Bio",
    },
  ]);

  const handleVisit = (unqname) => {
    navigate(`/visit/${unqname}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 py-8 px-4 sm:px-6 md:px-10 flex flex-col items-center">
      
      <div className="w-full max-w-6xl bg-white rounded-3xl p-6 sm:p-10 text-center shadow-lg mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-green-600 mb-4 flex justify-center items-center gap-2 flex-wrap">
          📚 Welcome to <span className="text-teal-600">Library.Io</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          Dive into a world of imagination and knowledge. Browse a wide range of genres, pick your favorite category, and start your reading journey today!
        </p>
        <button
          onClick={() => navigate("/searchitem")}
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition text-sm sm:text-base"
          >
          Search Here..
        </button>
      </div>

      <div className="w-full max-w-6xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6 text-center sm:text-left">
          🌟 Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-teal-700 mb-2">
                {category.name}
              </h3>
              <button
                onClick={() => handleVisit(category.unqname)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition text-sm sm:text-base"
              >
                Visit
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl p-6 sm:p-10 text-center shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">
          ❓ Need Help?
        </h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          For assistance, contact your librarian or check our FAQs. We're here to guide you through your reading experience.
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition text-sm sm:text-base">
          Contact Librarian
        </button>
      </div>
    </div>
  );
}
