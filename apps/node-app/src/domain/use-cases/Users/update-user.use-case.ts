import { UsersRepository } from "src/domain/repository";
import { UpdateUserDto } from '../../dtos/users';


interface UpdateUserUseCase {
    execute(UserUUID: string, UserDto: UpdateUserDto, ParentUUID: string): Promise<UpdateUserDto>
}

export class UpdateUser implements UpdateUserUseCase{
    constructor (
        private readonly repository: UsersRepository

    ) {}
    
    async execute(UserUUID: string, UserDto: UpdateUserDto, ParentUUID: string): Promise<UpdateUserDto> {
        return this.repository.updateById(UserUUID, UserDto, ParentUUID)
    }

}