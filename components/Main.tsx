"use client";
import { getPopularImages } from "@/utils/action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import ImageCards from "./ImageCards";
import { UnsplashImage, UnsplashImageResponse } from "@/utils/interfaces";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const Main = () => {
  const params = useSearchParams();
  const search = params.get("search");

  const loadMoreRef = useRef(null);

  const [searchTerm, setSearchTerm] = React.useState(search || "");
  let page = 1;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery<UnsplashImageResponse, Error>({
      queryKey: ["popularImages", debouncedSearchTerm],
      queryFn: () =>
        getPopularImages({ pageParam: page, searchTerm: debouncedSearchTerm }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < lastPage.total_pages) {
          page = pages.length + 1;
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  useEffect(() => {
    if (debouncedSearchTerm) {
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

      if (!history.includes(debouncedSearchTerm)) {
        const updatedHistory = [...history, debouncedSearchTerm];
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const images = data?.pages.flatMap((page) => page.results);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className=" flex items-center justify-between p-3  border-b w-full ">
        <div className="flex-grow flex justify-center">
          <input
            className="w-[200px] sm:w-[200px] md:w-[400px] lg:w-[600px] h-15 p-3 border border-gray-300 bg-slate-500 text-white placeholder:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            onChange={onChangeHandler}
            name="search"
            type="text"
            value={searchTerm}
            placeholder="Search"
          />
        </div>

        <Link
          href="/history"
          className="flex justify-center items-center px-3 md:px-6 py-1 w-auto h-auto rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
        >
          History
        </Link>
      </div>
      <ImageCards data={images} />
      <div ref={loadMoreRef} style={{ height: 20 }} />
    </div>
  );
};

export default Main;
