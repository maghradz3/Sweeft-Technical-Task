import { getDetailedImage } from "@/utils/action";
import { DetailedImage, UnsplashImage } from "@/utils/interfaces";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";
import { Tilt } from "react-tilt";

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const { data: detailedImage, isSuccess } = useQuery<DetailedImage, Error>({
    queryKey: ["detailedImage", selectedImageId],
    queryFn: () => getDetailedImage(selectedImageId),
    enabled: !!selectedImageId,
  });

  const handleImageClick = async () => {
    setSelectedImageId(image.id);
    setShowModal(true);
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      <Tilt options={defaultOptions} style={{ height: 270, width: 300 }}>
        <div className="w-[300px] h-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl cursor-pointer">
          <div
            className="w-full h-[200px] flex justify-center items-center relative overflow-hidden"
            onClick={handleImageClick}
          >
            <Image
              priority
              src={image.urls.regular}
              alt="image link"
              width={300}
              height={100}
            />
          </div>
        </div>
      </Tilt>
      {showModal && isSuccess && detailedImage && (
        <Modal image={detailedImage} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ImageCard;
