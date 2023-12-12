import { PrismaClient } from "@prisma/client";

//next.js  every sever render create new PrismaClient. To avoid it add the instance to global object
const client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
