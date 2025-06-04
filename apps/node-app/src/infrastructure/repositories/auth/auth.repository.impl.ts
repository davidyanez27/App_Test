import { AuthDatasource } from "../../../domain/datasources";
import { RegisterUserDto, LoginUserDto } from "../../../domain/dtos";
import { user } from "../../../domain/entities";
import { AuthRepository } from "../../../domain/repository/";

export class AuthRepositoryImpl implements AuthRepository {

    constructor (
        private readonly userDatasource : AuthDatasource,
    ){}
    register(user: RegisterUserDto): Promise<user> {
        return this.userDatasource.register( user );
    }
    login(user: LoginUserDto): Promise<user> {
        return this.userDatasource.login( user );
    }





}