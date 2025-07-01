import { UsersRepository } from "../../repository";
import { UserDto } from '../../dtos/users';

interface FindUserUseCase {
        execute(UserUUID: string, ParentUUID: string): Promise<UserDto>;
}

export class FindUser implements FindUserUseCase {
        constructor(
                private readonly repository: UsersRepository
        ) { }

        execute(UserUUID: string, ParentUUID: string): Promise<UserDto> {
                return this.repository.findById(UserUUID, ParentUUID);
        }

}