import React, { useEffect, useRef, useState } from "react";
import type { ComponentConfig } from "@measured/puck";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface StudentSuccessProps {
  title: string;
}

const carouselImages = [
  "https://picsum.photos/800/800?random=1",
  "https://picsum.photos/800/800?random=2",
  "https://picsum.photos/800/800?random=3",
];

const StudentSuccessComponent: React.FC<StudentSuccessProps> = ({ title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  // Check if we're on mobile using window.innerWidth
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDotClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    centerMode: true,
    centerPadding: isMobile ? "0px" : "5%",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-neutral-700 font-semibold text-xl md:text-2xl">{title}</h2>

      <div className="mt-4">
        <Slider ref={sliderRef} {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="outline-none px-0 md:px-1">
              <div className="relative pb-[100%] w-full md:w-[95%] mx-auto">
                <img
                  src={image}
                  alt={`Student Success ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Dot navigation */}
      <div className="mt-4 mx-auto flex justify-center">
        <div className="bg-blue-50 rounded-full p-2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full mx-1 ${currentSlide === index ? "bg-blue-500" : "bg-blue-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Puck component configuration
export const studentSuccessConfig: ComponentConfig<StudentSuccessProps> = {
  fields: {
    title: {
      type: "text",
    },
  },
  defaultProps: {
    title: "Student Success",
  },
  render: ({ title }) => <StudentSuccessComponent title={title} />,
};
