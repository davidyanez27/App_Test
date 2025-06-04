import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";
import { AuthDatasourceImpl } from "../../infrastructure/datasources";
import { EmailService } from "../Email";
import { envs } from "../../config";

export class Authroutes {
    public static get routes():Router{
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        )

        const datasource = new AuthDatasourceImpl(emailService);
        const authRepository = new AuthRepositoryImpl(datasource)

        const controller = new AuthController(authRepository,emailService);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/validate-email/:token', controller.ValidateUser);

        return router;
    }
}