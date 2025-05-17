import React from "react";
import Axiosinstance from "../Pages/Axiosinstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signin() {
  const api = Axiosinstance();
  let navigate = useNavigate();

  async function Handleform(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      let Res = await api.post(
        "http://127.0.0.1:8000/auth/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(Res.data);
      const { access } = Res.data;
      localStorage.setItem("token", access);
      navigate("/Profile");
      alert("Log in Successfully!");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password! Please try again.");
    }

    e.target.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-cyan-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Log In for the Library
        </h1>
        <form onSubmit={Handleform} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <Link
            to="/forgetpassword"
            className="text-blue-500 m-3 text-sm hover:underline"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
