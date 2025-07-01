import { RegisterUserInterface } from "@interfaces/auth.interface";
import { RegisterUserDto } from "../../dtos";
import { UsersRepository } from "../../repository";

interface RegisterUseCase {
        execute(UserUUID: RegisterUserDto, ParentUUID: string): Promise<RegisterUserInterface>;
}

export class RegisterSubUser implements RegisterUseCase {
        constructor(
                private readonly repository: UsersRepository
        ) { }

        execute(UserUUID: RegisterUserDto, ParentUUID: string): Promise<RegisterUserInterface> {
               return this.repository.create(UserUUID, ParentUUID)
        }

}