
import { Request, Response } from "express";
import { LoginUser, Register, SendValidationEmail, ValidateEmail, RenewToken, RegisterOAuth, GetAuthUrl } from "../../../domain/use-cases";
import { AuthRepository } from '../../../domain/repository';
import { LoginUserDto, RegisterUserDto } from "../../../domain/dtos";
import { CustomError } from "../../../domain/errors/customs.error";
import { EmailService, OAuth2Service } from "../../Services";
import { envs, regularExps } from "../../../config";

export class AuthController {

    // DI
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly emailService: EmailService,
        private readonly oauth2Service: OAuth2Service,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }

    public registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new Register(this.authRepository)
            .execute(registerUserDto!)
            .then(({ user }) => {
                res.json(`Welcome ${user.firstName}`)
                new SendValidationEmail(this.emailService, envs.WEBSERVICE_URL)
                    .execute(registerUserDto!.email)
                    .catch(error => this.handleError(error, res));
            })
            .catch(error => this.handleError(error, res));


    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))

    }
    public getOAuth2Url = (req: Request, res: Response) => {

        new GetAuthUrl(this.oauth2Service)
            .execute()
            .then((url) => {
                res.redirect(url)

            })
            .catch(error => this.handleError(error, res))
    }

    public userInfo = async (req: Request, res: Response) => {
        const code = req.query.code as string;
        try {
            new RegisterOAuth(this.authRepository)
                .execute(code)
                //  .then( (token) => res.json({"token": token}) )
                .then((jwtToken) => {
                    res.cookie("token", jwtToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax", 
                        maxAge: 1000 * 60 * 60 * 24, // 1 day
                    });
                    res.redirect("http://localhost:5173/"); 

                })
                .catch(error => this.handleError(error, res))
            // const res = await this.oauth2Service.getTokens(code);

            // const user = await this.oauth2Service.getUserInfo(res!);
            // console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    public validateToken = (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(' ')[1];

        new RenewToken(this.authRepository)
            .execute(token!)
            .then((token) => res.json({ "token": token }))
            .catch(error => this.handleError(error, res))

    }

    public ValidateUser = (req: Request, res: Response) => {
        const { token } = req.params;

        new ValidateEmail()
            .execute(token)
            .then((message) => res.json(message))
            .catch(error => this.handleError(error, res))
    }


}