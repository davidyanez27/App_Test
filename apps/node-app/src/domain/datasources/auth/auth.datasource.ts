import { LoginUserDto, RegisterUserDto } from "../../dtos";
import { user } from "../../entities";


export abstract class AuthDatasource{
    abstract register     ( user: RegisterUserDto ): Promise<user>;
    abstract login        ( user: LoginUserDto    ): Promise<user>;
}