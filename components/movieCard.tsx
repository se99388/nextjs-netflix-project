import { Movie } from "@prisma/client";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import React from "react";
import FavoritesButton from "./favoritesButton";
import useInfoModal from "@/hooks/useInfoModal";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
      <Image
        src={movie.thumbnailUrl}
        alt="thumbnailUrl"
        fill
        className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      h-[12vw]
      "
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-300
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover: translate-x-[2vw]
      group-hover:opacity-100
      "
      >
        <div
          className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-t-md
      w-full
      h-[12vw]
      "
        >
          <Image src={movie.thumbnailUrl} alt="thumbnailUrl" fill />
        </div>
        <div
          className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <div className="flex items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-100"
              onClick={() => router.push(`/watch/${movie.id}`)}
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoritesButton movieId={movie.id} />
            <div
              onClick={() => openModal(movie.id)}
              className="cursor-pointer ml-auto group/down-icon w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown
                className="text-white group-hover/down-icon:text-neutral-300"
                size={30}
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white ">2023</span>
          </p>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {movie.duration}
            </p>
          </div>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
