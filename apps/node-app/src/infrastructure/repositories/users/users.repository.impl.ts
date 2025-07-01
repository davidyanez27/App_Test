import { FindAllUsersResponseInterface, RegisterUserInterface } from "@interfaces/auth.interface";
import { UsersDatasource } from "../../../domain/datasources";
import { PaginationDto, RegisterUserDto, UpdateUserDto, UserDto } from "../../../domain/dtos";
import { UsersRepository } from "../../../domain/repository";

export class UsersRepositoryImpl implements UsersRepository {

    constructor (
        private readonly userDatasource : UsersDatasource,
    ){}

    create(user: RegisterUserDto, ParentUUID: string): Promise<RegisterUserInterface> {
        return this.userDatasource.create( user, ParentUUID);
    }
    findAll(ParentUUID: string, Pagination: PaginationDto): Promise<FindAllUsersResponseInterface> {
        return this.userDatasource.findAll(ParentUUID, Pagination);
    }
    findById(UserUUID: string, ParentUUID:string): Promise<UserDto> {
        return this.userDatasource.findById( UserUUID, ParentUUID);
    }
    updateById(UserUUID: string, UserDto: UpdateUserDto, ParentUUID:string): Promise<UpdateUserDto> {
        return this.userDatasource.updateById( UserUUID, UserDto, ParentUUID);
    }
    deleteById(UserUUID: string, ParentUUID:string): Promise<void> {
        return this.userDatasource.deleteById(UserUUID, ParentUUID)
    }




}