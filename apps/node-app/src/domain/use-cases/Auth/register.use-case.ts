import { RegisterUserDto } from "../../dtos";
import { user } from "../../entities";
import { AuthRepository, UserRepository } from "../../repository";

interface RegisterUseCase {
        execute(user: RegisterUserDto): Promise<user>;
}

export class RegisterUser implements RegisterUseCase {
        constructor(
                private readonly repository: AuthRepository
        ) { }

        execute(user: RegisterUserDto): Promise<user> {
                return this.repository.register(user);
        }

}