import { UnsplashImage, UnsplashImageResponse } from "@/utils/interfaces";
import React from "react";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

interface ImageCardsProps {
  data: UnsplashImage[] | undefined;
}

const ImageCards = ({ data }: ImageCardsProps) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 justify-items-center  gap-3 w-full  py-4 px-4"
    >
      {data?.map((image) => {
        return <ImageCard key={Math.random() * 1000} image={image} />;
      })}
    </motion.div>
  );
};

export default ImageCards;
