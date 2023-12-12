import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { name: session.user?.name },
  };
}

function Profiles({ name }: { name: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <Image
                className="         
                  w-44
                  h-44
                  rounded-md
                  flex
                  items-center
                  justify-center
                  border-2
                  border-transparent
                  group-hover:cursor-pointer
                  group-hover:border-white
                  overflow-hidden"
                src="/images/default-blue.png"
                alt=""
                width={100}
                height={100}
              />
              <div
                className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
                group-hover:cursor-pointer
                "
              >
                {name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
