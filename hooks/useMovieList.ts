import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { type Movie } from "@prisma/client";

const useMovieList = () => {
  const { data, error, isLoading } = useSWR<Movie[]>("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useMovieList;
