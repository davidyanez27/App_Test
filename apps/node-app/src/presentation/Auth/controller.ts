
import { Request, Response } from "express";
import { LoginUser, RegisterUser, SendValidationEmail, ValidateEmail} from "../../domain/use-cases";
import { AuthRepository } from '../../domain/repository';
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/customs.error";
import { EmailService } from "../Email";
import { envs } from "../../config";

export class AuthController {

    // DI
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly emailService  : EmailService,
    ){}

    private handleError = (error:unknown, res:Response) =>{
        if ( error instanceof CustomError) return res.status(error.statusCode).json({error:error.message});
        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'})
    }

    public registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        new RegisterUser( this.authRepository)
         .execute(registerUserDto!)
         .then(({user}) =>{
            res.json(`Welcome ${user.firstName}`)
            new SendValidationEmail(this.emailService,envs.WEBSERVICE_URL)
             .execute(registerUserDto!.email)
             .catch(error => this.handleError(error, res));
         })
         .catch(error => this.handleError(error, res));


    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body)
        if( error ) return res.status(400).json({error});

        new LoginUser( this.authRepository )
         .execute(loginUserDto!)
         .then( (user) => res.json(user) )
         .catch(error => this.handleError(error, res))

    }

    ValidateUser = (req: Request, res: Response) => {
        const {token} = req.params;

        new ValidateEmail()
         .execute(token)
         .then((message)=>res.json(message))
         .catch(error => this.handleError(error, res))

    }

}