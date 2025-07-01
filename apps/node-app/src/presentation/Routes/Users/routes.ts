import { Router } from "express";
import { UsersRepositoryImpl } from "../../../infrastructure/repositories";
import { UsersDatasourceImpl } from "../../../infrastructure/datasources";
import { EmailService } from "../../Services";
import { envs } from "../../../config";
import { AuthMiddleware, CheckRolesMiddleware} from "../../middlewares";
import { UsersController } from "./controller";

export class UsersRoutes {
    public static get routes():Router{
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        )

        const datasource = new UsersDatasourceImpl(emailService);
        const usersRepository = new UsersRepositoryImpl(datasource)

        const controller = new UsersController(usersRepository,emailService);

        router.post('/register',     [ AuthMiddleware.ValidateJWT ], [ CheckRolesMiddleware.CheckRole("admin") ], controller.registerUser);
        router.get ('/findAll',      [ AuthMiddleware.ValidateJWT ], [ CheckRolesMiddleware.CheckRole("admin") ], controller.findAllUser);
        router.get ('/find/:uuid',   [ AuthMiddleware.ValidateJWT ], [ CheckRolesMiddleware.CheckRole("admin") ], controller.findUser);

        router.post('/update/:uuid', [ AuthMiddleware.ValidateJWT ], [ CheckRolesMiddleware.CheckRole("admin") ], controller.updateUser);
        router.post('/delete/:uuid', [ AuthMiddleware.ValidateJWT ], [ CheckRolesMiddleware.CheckRole("admin") ], controller.deleteUser);


        return router;
    }
}