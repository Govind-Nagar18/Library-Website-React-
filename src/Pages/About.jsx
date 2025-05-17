import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-4">
          📖 About Us
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          This page is currently under construction. Soon you’ll be able to
          learn more about our mission, our team, and the inspiration behind this
          project.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          Thank you for your interest 💙 Check back soon!
        </div>
      </div>
    </div>
  );
}
