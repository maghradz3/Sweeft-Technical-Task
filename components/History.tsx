"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const History = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);
  return (
    <div className="flex justify-center flex-col items-center">
      <Link href="/">
        <button>Main Page</button>
      </Link>
      <div className="flex flex-col">
        {searchHistory?.map((historyItem) => {
          return (
            <Link
              key={historyItem}
              href={`/?search=${encodeURIComponent(historyItem)}` || "/"}
            >
              {historyItem}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default History;
