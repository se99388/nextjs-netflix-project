import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { type User } from "@prisma/client";
import axios from "axios";

type Props = {
  movieId: string;
};
function FavoritesButton({ movieId }: Props) {
  const { data: user, mutate: mutateUser } = useCurrentUser();
  const { mutate: favoritesMutate } = useFavorites();

  const isFavorite = user?.favoriteIds.includes(movieId);

  return (
    <div
      onClick={async () => {
        let response;
        if (isFavorite) {
          response = await axios.delete<User>("/api/favorite", {
            data: { movieId },
          });
        } else {
          response = await axios.post<User>("api/favorite", { movieId });
        }

        mutateUser({
          ...(user as User),
          favoriteIds: response.data.favoriteIds,
        });
        favoritesMutate();
      }}
      className="
  cursor-pointer
  group/item
  w-6
  h-6
  lg:w-10
  lg:h-10
  border-white
  border-2
  rounded-full
  flex
  justify-center
  items-center
  transition
  hover:border-neutral-300
  "
    >
      {isFavorite ? (
        <AiOutlineCheck className="text-white" size={25} />
      ) : (
        <AiOutlinePlus className={"text-white"} size={25} />
      )}
    </div>
  );
}

export default FavoritesButton;
