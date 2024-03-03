import { getDetailedImage } from "@/utils/action";
import { DetailedImage, UnsplashImage } from "@/utils/interfaces";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";

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

  return (
    <div className="w-[300px] h-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl cursor-pointer">
      <div
        className="w-full h-[200px] flex justify-center items-center relative overflow-hidden"
        onClick={handleImageClick}
      >
        <Image
          priority
          src={image.urls.small}
          alt="image link"
          width={300}
          height={100}
        />
      </div>

      {showModal && isSuccess && detailedImage && (
        <Modal image={detailedImage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ImageCard;
