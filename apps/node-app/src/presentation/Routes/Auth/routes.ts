import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories";
import { AuthDatasourceImpl } from "../../../infrastructure/datasources";
import { EmailService, TokenService } from "../../Services";
import { envs } from "../../../config";
import { AuthMiddleware } from "../../middlewares";

export class AuthRoutes {
    public static get routes():Router{
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        )
        const tokenService = new TokenService();

        const datasource = new AuthDatasourceImpl(emailService, tokenService);
        const authRepository = new AuthRepositoryImpl(datasource)

        const controller = new AuthController(authRepository,emailService);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/validate-email/:token', controller.ValidateUser);
        router.get('/renew',[ AuthMiddleware.ValidateJWT ], controller.validateToken);

        return router;
    }
}