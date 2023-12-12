import React from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Movie } from "@prisma/client";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { getSession } from "next-auth/react";

type Props = {
  data: Movie;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const { movieId } = context.params as { movieId: string };
  const movie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movie) {
    throw new Error("invalid ID");
  }

  return { props: { data: movie } };
};

function Watch({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  //you can also get movie from client fetch (not best practice):
  // const { movieId } = router.query;
  // const { data } = useMovie(movieId as string);
  return (
    <div
      className="
      h-screen w-screen bg-black 
      "
    >
      <nav
        className="
          fixed
          w-full
          p-4
          z-10
          flex
          items-center
          gap-8
          bg-black
          bg-opacity-70
          "
      >
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
}

export default Watch;

// function Watch() {
//   //you can get the id from props
//   const router = useRouter();
//   const { movieId } = router.query;
//   const { data } = useMovie(movieId as string);
//   return (
//     <div
//       className="
//     h-screen w-screen bg-black
//     "
//     >
//       <nav
//         className="
//         fixed
//         w-full
//         p-4
//         z-10
//         flex
//         items-center
//         gap-8
//         bg-black
//         bg-opacity-70
//         "
//       >
//         <AiOutlineArrowLeft
//           onClick={() => router.back()}
//           className="text-white cursor-pointer"
//           size={40}
//         />
//         <p className="text-white text-1xl md:text-3xl font-bold">
//           <span className="font-light">Watching:</span>
//           {data?.title}
//         </p>
//       </nav>
//       <video
//         autoPlay
//         controls
//         className="h-full w-full"
//         src={data?.videoUrl}
//       ></video>
//     </div>
//   );
// }

// export default Watch;
