import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

// Create a single instance to be shared across the application
const prisma = new PrismaClient().$extends({}).$extends(
  pagination({
    pages: {
      limit: 10,
      includePageCount: true,
    },
  })
);

export default prisma;
