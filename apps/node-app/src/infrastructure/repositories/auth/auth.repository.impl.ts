import { loginUserInterface } from "@interfaces/auth.interface";
import { AuthDatasource } from "../../../domain/datasources";
import { RegisterUserDto, LoginUserDto } from "../../../domain/dtos";
import { AuthRepository } from "../../../domain/repository/";

export class AuthRepositoryImpl implements AuthRepository {

    constructor (
        private readonly authDatasource : AuthDatasource,
    ){}
    OAuth2(token: string): Promise<string> {
        return this.authDatasource.OAuth2(token);
    }

    register(user: RegisterUserDto): Promise<loginUserInterface> {
        return this.authDatasource.register( user );
    }
    login(user: LoginUserDto): Promise<loginUserInterface> {
        return this.authDatasource.login( user );
    }
    
    renewToken(token: string): Promise<string> {
        return this.authDatasource.renewToken( token );
    }


}