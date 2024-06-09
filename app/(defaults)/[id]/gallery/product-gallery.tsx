"use client";

import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import Image from "next/image";
import React, { useState } from "react";

interface ImageSliderProps {
  images: { filename: string }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > images.length) newIndex = 1;
    if (newIndex < 1) newIndex = images.length;
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: React.SetStateAction<number>) => {
    setSlideIndex(n);
  };

  return (
    <div className="container mx-auto p-1 w-[70%]">
      <div className="relative">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`slides ${
              slideIndex === index + 1 ? "block" : "hidden"
            }`}
          >
            <Image
              src={getCloudinaryUrl(image.filename)}
              alt={`Slide ${index + 1}`}
              width={1700}
              height={650}
              className="h-[600px] max-sm:h-[300px]"
            />
          </div>
        ))}

        <div className="prevContainer absolute top-1/2 transform -translate-y-1/2 left-0 ml-6">
          <button
            className="prev bg-gray-800 rounded-r-full p-3 text-white"
            onClick={() => plusSlides(-1)}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
            </svg>
          </button>
        </div>

        <div className="nextContainer absolute top-1/2 transform -translate-y-1/2 right-0 mr-6">
          <button
            className="next bg-gray-800 rounded-l-full p-3 text-white"
            onClick={() => plusSlides(1)}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="caption-container bg-gray-900 text-white p-2 mt-2">
        <p id="caption">{`Slide ${slideIndex}`}</p>
      </div>

      <div className="flex mt-4 space-x-2">
        {images?.map((image, index) => (
          <div key={index} className="flex-1">
            <Image
              src={getCloudinaryUrl(image.filename)}
              alt={`Thumbnail ${index + 1}`}
              height={340}
              width={340}
              className={`slide-thumbnail cursor-pointer w-full ${
                slideIndex === index + 1 ? "opacity-100" : "opacity-60"
              }`}
              onClick={() => currentSlide(index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
