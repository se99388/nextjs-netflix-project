import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useMovie = (id: string) => {
  const { data, error, isLoading } = useSWR<Movie>(
    `/api/movies/${id}`,
    fetcher
  );

  return { data, error, isLoading };
};

export default useMovie;
