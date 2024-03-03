"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fadeIn } from "@/utils/variants";

const History = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <Link
        href="/"
        className="mb-8 inline-block bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200 ease-out"
      >
        <button>Main Page</button>
      </Link>
      <motion.h1
        variants={fadeIn("down", 0.6)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        View the history of the categories you searched for
      </motion.h1>
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-wrap justify-center items-center gap-4"
      >
        {searchHistory.length === 0 && (
          <p className="text-lg text-gray-600 mb-4">No search history found.</p>
        )}
        {searchHistory?.map((historyItem) => {
          return (
            <Link
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200"
              key={historyItem}
              href={`/?search=${encodeURIComponent(historyItem)}` || "/"}
            >
              {historyItem}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default History;
