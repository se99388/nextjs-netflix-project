import React from "react";
import { isEmpty } from "lodash";
import { type Movie } from "@prisma/client";
import MovieCard from "./movieCard";

type Props = {
  data?: Movie[];
  title: string;
};
function MovieList({ data, title }: Props) {
  if (isEmpty(data)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {(data as Movie[]).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
