import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../dtos";
import { user, UserEntity } from "../../entities";

export abstract class UserRepository{
    abstract create     ( user: RegisterUserDto ): Promise<user>;
    abstract findById   ( user: LoginUserDto    ): Promise<user>;
    abstract updateById ( user: UpdateUserDto   ): Promise<void>;
    abstract deleteById ( Id  : DeleteUserDto   ): Promise<void>;

}