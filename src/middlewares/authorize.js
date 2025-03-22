import { newEnforcer } from "casbin";
import { PrismaAdapter } from "casbin-prisma-adapter";
import path from "path";
import { sendError } from "../utils/response.js";

// Middleware otorisasi: menggunakan peran dari data user
// Authorization middleware: using user role for access control
const authorize = (resource, action) => {
    return async (req, res, next) => {
        try {
            const adapter = await PrismaAdapter.newAdapter();
            const enforcer = await newEnforcer(path.resolve("./model.conf"), adapter);

            if (!enforcer || !req.user) {
                return res.status(500).json({ message: 'Enforcer belum siap atau user tidak ditemukan' });
            }
            const allowed = await enforcer.enforce(req.user.role, resource, action);
            if (allowed) {
                next();
            } else {
                sendError(res, 'Akses ditolak', null, 403);
            }
        } catch (error) {
            sendError(res, 'Terjadi kesalahan saat memeriksa akses', error, 400);
        }
    };
}

export default authorize;