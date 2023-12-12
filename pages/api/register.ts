import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  try {
    const { email, name, password } = req.body;
    //checking for new user
    // const users = await prisma.user.findMany();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(442).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //create new user
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}
