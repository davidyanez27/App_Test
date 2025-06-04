import { UserDatasource } from "../../../domain/datasources";
import { RegisterUserDto, LoginUserDto, DeleteUserDto, UpdateUserDto } from "../../../domain/dtos";
import { user } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repository";

export class UserRepositoryImpl implements UserRepository {

    constructor (
        private readonly userDatasource : UserDatasource,
    ){}
    create(user: RegisterUserDto): Promise<user> {
        return this.userDatasource.create( user );
    }
    findById(user: LoginUserDto): Promise<user> {
        return this.userDatasource.findById( user );
    }
    updateById(user: UpdateUserDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteById(user: DeleteUserDto): Promise<void> {
        return this.deleteById(user)
    }




}