import { loginUserInterface } from "@interfaces/auth.interface";
import { AuthDatasource } from "../../../domain/datasources";
import { RegisterUserDto, LoginUserDto } from "../../../domain/dtos";
import { AuthRepository } from "../../../domain/repository/";

export class AuthRepositoryImpl implements AuthRepository {

    constructor (
        private readonly userDatasource : AuthDatasource,
    ){}

    register(user: RegisterUserDto): Promise<loginUserInterface> {
        return this.userDatasource.register( user );
    }
    login(user: LoginUserDto): Promise<loginUserInterface> {
        return this.userDatasource.login( user );
    }
    
    renewToken(token: string): Promise<string> {
        return this.userDatasource.renewToken( token );
    }


}