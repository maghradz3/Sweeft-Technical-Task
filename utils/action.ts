"use server";

import axios from "axios";
import {
  DetailedImage,
  DetailedImageStatistic,
  UnsplashImageResponse,
} from "./interfaces";

export const getPopularImages = async ({
  pageParam = 1,
  searchTerm = "",
}: {
  pageParam: number;
  searchTerm: string | null;
}): Promise<UnsplashImageResponse> => {
  const query = searchTerm ? searchTerm : "popular";

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
  if (!data) {
    throw new Error("Images not found");
  }

  return { ...data, prevOffset: pageParam };
};

export const getDetailedImage = async (
  id: string | null
): Promise<[DetailedImage, DetailedImageStatistic]> => {
  const { data: statistic } = await axios.get<DetailedImageStatistic>(
    `https://api.unsplash.com/photos/${id}/statistics`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  const { data } = await axios.get<DetailedImage>(
    `https://api.unsplash.com/photos/${id}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  if (!data) {
    throw new Error("Image not found");
  }

  return [data, statistic];
};
