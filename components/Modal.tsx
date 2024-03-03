import { DetailedImage } from "@/utils/interfaces";
import React, { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidAdjust } from "react-icons/bi";

interface ModalProps {
  image: DetailedImage;
  onClose: () => void;
}

const Modal = ({ image, onClose }: ModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  if (!image) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-40">
      <div
        ref={modalContentRef}
        className="bg-white p-4 rounded-lg flex flex-col  max-w-xl max-h-full overflow-auto"
      >
        <button className="self-end" onClick={onClose}>
          <IoCloseSharp className="w-5 h-5 text-red-500" />
        </button>

        <img src={image.urls.raw} alt={image.description} />
        <div className="flex justify-center items-center gap-10">
          <h2 className="text-lg font-bold flex justify-center items-center gap-1">
            <span className="text-gray-500 ">
              <PiDownloadSimpleBold />
            </span>
            {image.downloads || "Image Details"}
          </h2>
          <h2 className="text-lg font-bold flex justify-center items-center gap-4">
            <span className="text-gray-500">
              <BiSolidLike />
            </span>
            {image.likes || "Image Details"}
          </h2>
          <h2 className="text-lg font-bold flex justify-center items-center gap-4">
            <span className="text-gray-500">
              <BiSolidAdjust />
            </span>
            {image.exif.iso || ""}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
