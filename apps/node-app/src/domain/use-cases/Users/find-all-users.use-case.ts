
import { UsersRepository } from "../../repository";
import { UserDto, PaginationDto } from '../../dtos/';
import { FindAllUsersResponseInterface } from "@interfaces/auth.interface";


interface FindAllUseCase {
    execute(ParentUUID: string, Pagination: PaginationDto): Promise<FindAllUsersResponseInterface>
}

export class FindAllUsers implements FindAllUseCase{
    constructor (
        private readonly repository: UsersRepository
    ) {}
    
    execute(ParentUUID: string, Pagination: PaginationDto): Promise<FindAllUsersResponseInterface> {
        return this.repository.findAll(ParentUUID, Pagination);
    }

}