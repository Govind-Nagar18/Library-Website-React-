import React from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Pages/Axiosinstance";
export default function Signin() {
  let navigate = useNavigate();
  const api = Axiosinstance();  

  async function Handleform(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    formData.append("image", e.target.image.files[0]);
    formData.append("phone", e.target.phone.value);
    formData.append("email", e.target.email.value);

    try {
      let Res = await api.post(
        "/auth/signup/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(Res.data);
      const { access } = Res.data;
      localStorage.setItem("token", access);
      navigate("/Profile");
      alert("User Created Successfully");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Bad Request!!!");
    }

    e.target.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-cyan-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Sign Up for the Library
        </h1>
        <form onSubmit={Handleform} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Photo</label>
            <input
              type="file"
              name="image"
              className="w-full px-4 py-2 border rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
