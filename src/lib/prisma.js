import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

// Create a single instance to be shared across the application
const prisma = new PrismaClient().$extends({
    result: {
        users: {
            password: {
                needs: {},
                compute() {
                    return undefined
                }
            }
        }
    },
}).$extends(pagination({
    pages: {
        includePageCount: true
    }
}));

export default prisma;