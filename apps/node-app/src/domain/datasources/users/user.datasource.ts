import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../dtos";
import { user, UserEntity } from "../../entities";


export abstract class UserDatasource{
    abstract create     ( user: RegisterUserDto ): Promise<user>;
    abstract findById   ( user: LoginUserDto    ): Promise<user>;
    abstract updateById ( user: UpdateUserDto   ): Promise<void>;
    abstract deleteById ( user: DeleteUserDto   ): Promise<void>;

}