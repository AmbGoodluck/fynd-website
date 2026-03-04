"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const travelImagesPool = [
  {
    url: "/travel-images/tropical-resort.jpg",
    alt: "Tropical island paradise with bungalows and turquoise waters",
  },
  {
    url: "/travel-images/city-skyline.jpg",
    alt: "Urban cityscape aerial view of modern metropolis",
  },
  {
    url: "/travel-images/tower-bridge.jpg",
    alt: "Historic Tower Bridge in London over the Thames",
  },
  {
    url: "/travel-images/alpine-mountains.jpg",
    alt: "Alpine mountain valley with pristine lake reflection",
  },
  {
    url: "/travel-images/ancient-stonehenge.jpg",
    alt: "Ancient Stonehenge monument in rural landscape",
  },
  {
    url: "/travel-images/italian-galleria.jpg",
    alt: "Italian architecture and historic galleria plaza",
  },
  {
    url: "/travel-images/city-street.jpg",
    alt: "Vibrant city street with towering skyscrapers",
  },
];

export const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set<string>());

  const displayImages = travelImagesPool.filter(
    (img) => !failedImages.has(img.url)
  );

  const handleImageError = (imageUrl: string) => {
    setFailedImages((prev) => new Set(prev).add(imageUrl));
  };

  useEffect(() => {
    if (displayImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  // Fallback gradient background
  if (displayImages.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-fynd to-green-500" />
    );
  }

  const currentImage = displayImages[currentIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {displayImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority={index === currentIndex}
              className="object-cover"
              onError={() => handleImageError(image.url)}
              loading={index === currentIndex ? "eager" : "lazy"}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Indicator Dots */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {displayImages.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
