import { Router } from "express";
import { AuthRoutes, UsersRoutes } from "./Routes/";

export class AppRoutes {
    public static get routes():Router{
        const router = Router();
        router.use('/api/auth',  AuthRoutes.routes)
        router.use('/api/users', UsersRoutes.routes)

        return router;
    }
}