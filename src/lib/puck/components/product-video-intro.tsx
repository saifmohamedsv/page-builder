import { ComponentConfig } from "@measured/puck";
import { useRef, useState } from "react";

interface ProductVideoProps {
  src: string;
  isBestseller?: boolean;
  aspectRatio?: "4:3" | "16:9";
}

const ProductVideo: React.FC<ProductVideoProps> = ({ src, isBestseller = false, aspectRatio = "16:9" }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectRatioClass = {
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
  }[aspectRatio];

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsMuted(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`relative ${aspectRatioClass} rounded-lg overflow-hidden`}>
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          controls={!isMuted}
          loop
          playsInline
          muted={isMuted}
        />

        {isBestseller && (
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 text-sm font-bold rounded-tr-xl rounded-bl-xl">
            Best Seller
          </div>
        )}

        {isMuted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleUnmute}
              className="px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center gap-2"
            >
              <span className="text-sm font-medium">Unmute</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const productVideoConfig: ComponentConfig<ProductVideoProps> = {
  fields: {
    src: { type: "text" },
    aspectRatio: {
      type: "select",
      options: [
        { value: "4:3", label: "4:3" },
        { value: "16:9", label: "16:9" },
      ],
    },
  },
  defaultProps: {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    isBestseller: false,
    aspectRatio: "16:9",
  },
  render: (props) => <ProductVideo {...props} />,
};
