import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../dtos";
import { user, UserEntity } from "../../entities";


export abstract class ProjectsDatasource{
    abstract create     ( user: RegisterUserDto ): Promise<void>;
    abstract findById   ( user: LoginUserDto    ): Promise<void>;
    abstract updateById ( user: UpdateUserDto   ): Promise<void>;
    abstract deleteById ( user: DeleteUserDto   ): Promise<void>;

}