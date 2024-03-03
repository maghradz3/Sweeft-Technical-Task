import Link from "next/link";
import React from "react";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Something went wrong...
      </h1>
      <p className="text-lg text-gray-600 mb-6">Please try again later.</p>
      <Link
        href="/"
        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorMessage;
