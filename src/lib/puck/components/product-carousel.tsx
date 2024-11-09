import React, { useRef, useState } from "react";
import { ComponentConfig } from "@measured/puck";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductCarouselProps {
  images: { url: string }[];
  alt: string;
  isBestseller?: boolean;
  aspectRatio?: "4:3" | "16:9";
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  alt,
  isBestseller = false,
  aspectRatio = "16:9",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const thumbSliderRef = useRef<Slider>(null);

  const aspectRatioClass = {
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
  }[aspectRatio];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <div className={`relative ${aspectRatioClass} rounded-lg overflow-hidden`}>
        <Slider ref={sliderRef} {...settings}>
          {images.map((img, index) => (
            <div key={index} className="w-full h-full">
              <img src={img.url} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Slider>

        {isBestseller && (
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 text-sm font-bold rounded-tr-xl rounded-bl-xl">
            Best Seller
          </div>
        )}

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="px-4 py-2 bg-white/30 rounded-full text-white hover:bg-white/40"
          >
            Prev
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="px-4 py-2 bg-white/30 rounded-full text-white hover:bg-white/40"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-2 w-full overflow-hidden">
        <Slider ref={thumbSliderRef} {...thumbnailSettings}>
          {images.map((img, index) => (
            <div key={index} className="px-1">
              <button
                onClick={() => {
                  sliderRef.current?.slickGoTo(index);
                  setCurrentSlide(index);
                }}
                className={`w-full h-20 md:h-24 relative ${
                  currentSlide === index ? "border-2 border-red-500 rounded" : "ring-1 ring-gray-300"
                }`}
              >
                <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded" />
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export const productCarouselConfig: ComponentConfig<ProductCarouselProps> = {
  fields: {
    images: {
      type: "array",
      arrayFields: {
        url: {
          type: "text",
        },
      },
    },
    alt: { type: "text" },
    aspectRatio: {
      type: "select",
      options: [
        { value: "4:3", label: "4:3" },
        { value: "16:9", label: "16:9" },
      ],
    },
  },
  defaultProps: {
    images: [
      { url: "https://picsum.photos/800/600?random=1" },
      { url: "https://picsum.photos/800/600?random=2" },
      { url: "https://picsum.photos/800/600?random=3" },
    ],
    alt: "Product Image",
    isBestseller: false,
    aspectRatio: "16:9",
  },
  render: ({ alt, images, aspectRatio }) => <ProductCarousel alt={alt} images={images} aspectRatio={aspectRatio} />,
};
