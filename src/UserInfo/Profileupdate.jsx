import React from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Pages/Axiosinstance";

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const api = Axiosinstance();

  async function handleUpdate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    try {
      const response = await api.put(
        "/auth/profileupdate/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      alert("Profile updated successfully!");
      navigate("/Profile");
    } catch (error) {
      console.error("Update Error:", error);
      console.log(error.response);
      alert("Failed to update profile. Make sure you're logged in.");
    }

    e.target.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-cyan-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Update Your Profile
        </h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter new username"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter new email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter new phone number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              className="w-full px-4 py-2 border rounded-xl bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
