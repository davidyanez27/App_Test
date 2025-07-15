import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories";
import { AuthDatasourceImpl } from "../../../infrastructure/datasources";
import { EmailService, OAuth2Service, TokenService } from "../../Services";
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
        
        const oauthService = new OAuth2Service(
            envs.CLIENT_ID,
            envs.CLIENT_SECRET,
            envs.REDIRECT_URL
        )
        const tokenService = new TokenService();

        const datasource = new AuthDatasourceImpl(emailService, tokenService, oauthService);
        const authRepository = new AuthRepositoryImpl(datasource)

        const controller = new AuthController(authRepository,emailService, oauthService);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/validate-email/:token', controller.ValidateUser);
        router.get('/renew',[ AuthMiddleware.ValidateJWT ], controller.validateToken);

        router.get('/google', controller.getOAuth2Url)
        router.get('/oauth', controller.userInfo)


        return router;
    }
}