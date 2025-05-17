import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance, { BASE_URL } from "../Pages/Axiosinstance";

export default function Profile() {
  const api = Axiosinstance();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoverSignIn, setHoverSignIn] = useState(false);
  const [hoverLogIn, setHoverLogIn] = useState(false);

  useEffect(() => {
    if (!token) return setLoading(false);

    async function fetchUserData() {
      try {
        const res = await api.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100">
        <div className="text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      {token ? (
        <UserProfile userData={userData} onLogout={handleLogout} navigate={navigate} />
      ) : (
        <GuestView
          hoverSignIn={hoverSignIn}
          setHoverSignIn={setHoverSignIn}
          hoverLogIn={hoverLogIn}
          setHoverLogIn={setHoverLogIn}
          navigate={navigate}
        />
      )}
    </div>
  );
}

function UserProfile({ userData, onLogout, navigate }) {
  return (
    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
          <img
            src={userData?.image?.startsWith("http") 
              ? userData.image 
              : `${BASE_URL}${userData?.image}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left w-full">
          <h1 className="text-2xl md:text-3xl font-semibold text-teal-600">
            Welcome {userData?.username}
          </h1>
          <p className="text-base md:text-lg text-gray-700 mt-2">Email: {userData?.email}</p>
          <p className="text-base md:text-lg text-gray-700">Phone: {userData?.phone}</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start mt-4 gap-3">
            <button
              onClick={() => navigate("/profileupdate")}
              className="px-5 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={onLogout}
              className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">About Our Library</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Our library offers a world of knowledge and self-discovery. From physical books to
          digital resources, immerse yourself in growth and exploration.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">Your Books</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2].map((book) => (
            <div
              key={book}
              className="bg-gray-100 rounded-lg shadow hover:scale-105 transition overflow-hidden"
            >
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?semt=ais_hybrid&w=740"
                alt="Book"
                className="w-full h-28 object-cover"
              />
              <p className="text-sm text-center p-2">Book {book}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuestView({ hoverSignIn, setHoverSignIn, hoverLogIn, setHoverLogIn, navigate }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
        <svg
          className="w-10 h-10 md:w-12 md:h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">Welcome!</h1>
      <p className="text-gray-600 mb-1">Please sign up to explore 😊</p>
      <p className="text-gray-600 mb-6">Already a member? Log in instead!</p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/signin")}
          onMouseEnter={() => setHoverSignIn(true)}
          onMouseLeave={() => setHoverSignIn(false)}
          className={`py-3 px-6 rounded-full font-bold text-lg transition-all ${
            hoverSignIn
              ? "bg-teal-600 shadow-lg transform -translate-y-1"
              : "bg-teal-500 shadow-md"
          } text-white`}
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center my-2 text-gray-400 text-sm">
          <hr className="flex-grow border-t" />
          <span className="px-2">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={() => navigate("/login")}
          onMouseEnter={() => setHoverLogIn(true)}
          onMouseLeave={() => setHoverLogIn(false)}
          className={`py-3 px-6 rounded-full font-bold text-lg transition-all ${
            hoverLogIn
              ? "bg-blue-600 shadow-lg transform -translate-y-1"
              : "bg-blue-500 shadow-md"
          } text-white`}
        >
          Log In
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>By continuing, you agree to our Terms of Service.</p>
      </div>
    </div>
  );
}
