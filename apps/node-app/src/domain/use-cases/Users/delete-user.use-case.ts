import { UsersRepository } from "../../repository";


interface DeleteUserUseCase {
    execute(UserUUID: string, ParentUUID: string): Promise<void>
}

export class DeleteUser implements DeleteUserUseCase{
    constructor (
        private readonly repository: UsersRepository
    ) {}
    
    execute(UserUUID: string, ParentUUID: string): Promise<void> {
        return this.repository.deleteById(UserUUID, ParentUUID);
    }

}