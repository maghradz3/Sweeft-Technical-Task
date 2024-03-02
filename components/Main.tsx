"use client";
import { getPopularImages } from "@/utils/action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import SearchBar from "./SearchBar";
import ImageCards from "./ImageCards";
import { UnsplashImage, UnsplashImageResponse } from "@/utils/interfaces";
import React, { useState, useEffect, useRef } from "react";

interface InfiniteQueryData {
  pages: Number[];
  pageParams: [
    {
      total: number;
      total_pages: number;
      results: UnsplashImage[];
      prevOffset: number;
    }
  ];
}

const Main = () => {
  const loadMoreRef = useRef(null);
  let page = 1;
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery<UnsplashImageResponse, Error>({
      queryKey: ["popularImages"],
      queryFn: () => getPopularImages(page),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        console.log("lastpagee", lastPage);
        console.log("pagees", pages.length);
        if (pages.length < lastPage.total_pages) {
          page = pages.length + 1;
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  console.log("outside page", page);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
          console.log("fetchNExtpage", fetchNextPage);
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
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const images = data?.pages.flatMap((page) => page.results);

  return (
    <div className="flex flex-col justify-center items-center ">
      <SearchBar />
      <ImageCards data={images} />
      <div ref={loadMoreRef} style={{ height: 20 }} />
    </div>
  );
};

export default Main;
