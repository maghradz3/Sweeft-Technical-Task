"use server";

import axios from "axios";
import { UnsplashImageResponse } from "./interfaces";

export const getPopularImages = async (
  pageParam = 1
): Promise<UnsplashImageResponse> => {
  const { data } = await axios.get<UnsplashImageResponse>(
    `https://api.unsplash.com/search/photos?page=${pageParam}&query=""&per_page=20&order_by=popular`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  console.log("shemovida");
  console.log(data);
  return { ...data, prevOffset: pageParam };
  //   return data;
};
