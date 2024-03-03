"use server";

import axios from "axios";
import { DetailedImage, UnsplashImageResponse } from "./interfaces";

export const getPopularImages = async ({
  pageParam = 1,
  searchTerm = "",
}: {
  pageParam: number;
  searchTerm: string | null;
}): Promise<UnsplashImageResponse> => {
  const query = searchTerm ? searchTerm : "popular";
  console.log("aeeee", searchTerm);
  const { data } = await axios.get<UnsplashImageResponse>(
    `https://api.unsplash.com/search/photos?page=${pageParam}&query=${encodeURIComponent(
      query
    )}&per_page=20&order_by=popular`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  return { ...data, prevOffset: pageParam };
};

export const getDetailedImage = async (
  id: string | null
): Promise<DetailedImage> => {
  const { data } = await axios.get<DetailedImage>(
    `https://api.unsplash.com/photos/${id}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  console.log(data);
  return data;
};
