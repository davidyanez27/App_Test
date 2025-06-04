import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../dtos";
import { user, UserEntity } from "../../entities";

export abstract class AuthRepository{
    abstract register     ( user: RegisterUserDto ): Promise<user>;
    abstract login        ( user: LoginUserDto    ): Promise<user>;
}