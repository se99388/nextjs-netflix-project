import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

type Props = {
  movieId: string;
};

function PlayButton({ movieId }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
  bg-white
  rounded-md
  py-1 md:-py-2
  px-2 md:px-4
  w-auto
  text-xs lg:text-lg
  font-semibold
  flex
  gap-1
  items-center
  hover:bg-neutral-300
  transition
  "
    >
      <BsFillPlayFill size={25} />
      Play
    </button>
  );
}

export default PlayButton;
