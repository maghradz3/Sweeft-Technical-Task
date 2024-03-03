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
  //   const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");
  console.log(params);
  //   const {
  //     query: { search },
  //   } = router;
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
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const images = data?.pages.flatMap((page) => page.results);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  console.log(searchTerm);

  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="flex justify-center items-center gap-4 p-3">
        <input
          className="w-[600px] h-15 p-3 border border-slate-600 bg-slate-600 text-white placeholder:text-white rounded-md"
          onChange={onChangeHandler}
          name="search"
          type="text"
          value={searchTerm}
          placeholder="Search"
        />

        <Link
          href="/history"
          className="flex justify-center items-center p-5 w-40 h-12 rounded-md  bg-slate-600 text-white hover:bg-slate-800"
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
