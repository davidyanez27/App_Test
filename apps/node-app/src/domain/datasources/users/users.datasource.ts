import { FindAllUsersResponseInterface, RegisterUserInterface } from "@interfaces/auth.interface";
import { PaginationDto, RegisterUserDto, UpdateUserDto, UserDto } from "../../dtos";


export abstract class UsersDatasource {
    abstract create    (User: RegisterUserDto, ParentUUID: string): Promise<RegisterUserInterface>;
    abstract findAll   (ParentUUID: string, Pagination: PaginationDto): Promise<FindAllUsersResponseInterface>;
    abstract findById  (UserUUID: string, ParentUUID: string): Promise<UserDto>;
    abstract updateById(UserUUID: string, UserDto: UpdateUserDto, ParentUUID: string): Promise<UpdateUserDto>;
    abstract deleteById(UserUUID: string, ParentUUID: string): Promise<void>;
}