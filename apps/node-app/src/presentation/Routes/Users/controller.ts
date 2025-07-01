
import { Request, Response } from "express";
import { RegisterSubUser, FindAllUsers, FindUser, UpdateUser, DeleteUser} from "../../../domain/use-cases";
import { RegisterUserDto, UpdateUserDto } from "../../../domain/dtos";
import { CustomError } from "../../../domain/errors/customs.error";
import { UsersRepository } from "../../../domain/repository";
import { EmailService } from "../../../presentation/Services";
import { regularExps } from '../../../config/';
import { PaginationDto } from '../../../domain/dtos';

export class UsersController {

    // DI
    constructor(
         private readonly usersRepository: UsersRepository,
         private readonly emailService  : EmailService,

    ){}

    private handleError = (error:unknown, res:Response) =>{
        if ( error instanceof CustomError) return res.status(error.statusCode).json({error:error.message});
        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'})
    }

    public registerUser = (req: Request, res: Response) => {        
        const uuid = (req as any).user.uuid;

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        new RegisterSubUser( this.usersRepository)
         .execute(registerUserDto!, uuid )
         .then(({user}) =>{
            res.json(`Welcome ${user.firstName}`)
         })
         .catch(error => this.handleError(error, res));


    }

    public findAllUser = (req: Request, res: Response) => {
        const UserUUID = (req as any).user.uuid;
        const {page = 1, limit = 5} = req.query;
        const [error, pagination] = PaginationDto.create(+page, +limit)
        if ( error ) return res.status(400).json({error})

        new FindAllUsers( this.usersRepository)
         .execute(UserUUID, pagination!)
         .then((users) =>{
            res.json(users)
         })
         .catch(error => this.handleError(error, res));


    }

    public findUser = (req: Request, res: Response) => {
         const UserUUID = req.params.uuid
         if(!UserUUID) return res.status(400).json({error: 'Missing User UUID'});
         if(!regularExps.uuidV4.test(UserUUID as string)) return res.status(400).json({error: "Invalid username format."});

         const {uuid} = (req as any).user

        new FindUser( this.usersRepository)
         .execute( UserUUID as string, uuid)
         .then((user) =>{
            res.json(user)
         })
         .catch(error => this.handleError(error, res));

    }

    public updateUser = (req: Request, res: Response) => {
         const ParentUUID = (req as any).user.uuid;
         const UserUUID = req.params.uuid;
         if ( !UserUUID ) return res.status(400).json({erro: 'Missing User UUID'});

        const [error, updateUserDto] = UpdateUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        new UpdateUser( this.usersRepository)
         .execute(UserUUID, updateUserDto!, ParentUUID)
         .then((user) =>{
            res.json(user)
         })
         .catch(error => this.handleError(error, res));

    }

    public deleteUser = (req: Request, res: Response) => {
         const ParentUUID = (req as any).user.uuid;

         const UserUUID = req.params.uuid;
         if ( !UserUUID ) return res.status(400).json({erro: 'Missing User UUID'});

        new DeleteUser( this.usersRepository)
         .execute(UserUUID, ParentUUID)
         .then(() =>{
            res.json(`User deleted sucessfully `)
         })
         .catch(error => this.handleError(error, res));


    }    


}