import { PrismaClient } from "@prisma/client";
import argon from "argon2";

const prisma = new PrismaClient();

async function main() {
    await prisma.users.create({
        data: {
            name: "admin",
            password: await argon.hash("password"),
            email: "admin@gmail.com",
            role_user: {
                create: {
                    roles: {
                        create: {
                            name: "admin",
                        }
                    },
                }
            }
        },
    });
    await prisma.users.create({
        data: {
            name: "user",
            password: await argon.hash("password"),
            email: "user@gmail.com",
            role_user: {
                create: {
                    roles: {
                        create: {
                            name: "user",
                        }
                    },
                }
            }
        },
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1); // Exit with a non-zero code to indicate an error occurred asynchronously
})