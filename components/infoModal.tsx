import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./playButton";
import FavoritesButton from "./favoritesButton";

type Props = {
  visible?: boolean;
  onClose: () => void;
};

function InfoModal({ visible = false, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(visible); //it is for the scale-100/0 that do a nice animation of show/hide
  const { movieId = "" } = useInfoModal();
  const { data, isLoading } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className="
  z-50
  transition
  duration-300
  bg-black
  bg-opacity-80
 flex
 justify-center
 items-center
 overflow-x-hidden
 overflow-y-auto
 fixed
 inset-0
  "
      onClick={(e) => {
        handleClose();
      }}
    >
      <div
        className="
     relative
     w-auto
     mx-auto
     max-w-3xl
     z-100
     rounded-md
     overflow-hidden
   
     "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${isVisible ? "scale-100" : "scale-0"}
            transform
            duration-300
            relative
            flex-auto
            bg-zinc-900
            drop-shadow-md
            `}
        >
          {isLoading || !data ? (
            <div
              className="
            relative
            text-white
            p-10
            "
            >
              Loading...
            </div>
          ) : (
            <>
              <div
                className="
            relative
            h-96
            "
              >
                <video
                  className="
            w-full
            brightness-[60%]
            object-cover
            h-full
            "
                  autoPlay
                  muted
                  loop
                  poster={data.thumbnailUrl}
                  src={data.videoUrl}
                ></video>
                <div
                  className="
            cursor-pointer
            absolute
            top-3
            right-3
            h-10
            w-10
            rounded-full
            bg-black
            bg-opacity-70
            flex
            items-center
            justify-center
            "
                  onClick={handleClose}
                >
                  <AiOutlineClose className="text-white" size={20} />
                </div>
                <div
                  className="
            absolute
            bottom-[10%]
            left-10
            "
                >
                  <p className="text-white text-3xl md:text-4xl h-full lg:text-5px font-bold mb-8">
                    {data?.title}
                  </p>
                  <div className="flex gap-4 items-center">
                    <PlayButton movieId={data.id} />
                    <FavoritesButton movieId={data.id} />
                  </div>
                </div>
              </div>
              <div className="px-12 py-12">
                <p className="text-green-400 font-semibold text-lg">New</p>
                <p className="text-white text-lg">{data.duration}</p>
                <p className="text-white text-lg">{data.genre}</p>
                <p className="text-white text-lg">{data.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
