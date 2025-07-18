import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../dtos";


export abstract class ProductsDatasource{
    abstract create     ( product: RegisterUserDto ): Promise<void>;
    abstract findById   ( product: LoginUserDto    ): Promise<void>;
    abstract updateById ( product: UpdateUserDto   ): Promise<void>;
    abstract deleteById ( product: DeleteUserDto   ): Promise<void>;

}