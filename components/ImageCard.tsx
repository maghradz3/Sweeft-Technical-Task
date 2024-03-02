import { UnsplashImage } from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <div className="w-[300px] h-[200px] border border-blue-700">
      <div className="w-[300px] h-[170px] flex justify-center items-center border border-red-300 overflow-hidden">
        <Image
          //   className="object-cover object-center"
          priority
          //   objectFit="cover"
          //   objectPosition="center"
          src={image.urls.full}
          alt="image link"
          width={300}
          height={100}
        />
      </div>
    </div>
  );
};

export default ImageCard;
