import { UnsplashImage, UnsplashImageResponse } from "@/utils/interfaces";
import React from "react";
import ImageCard from "./ImageCard";

interface ImageCardsProps {
  data: UnsplashImage[] | undefined;
}

const ImageCards = ({ data }: ImageCardsProps) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 justify-items-center  gap-3 w-full  py-4 px-4">
      {data?.map((image) => {
        return <ImageCard key={Math.random() * 1000} image={image} />;
      })}
    </div>
  );
};

export default ImageCards;
