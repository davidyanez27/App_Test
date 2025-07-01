import { loginUserInterface } from "@interfaces/auth.interface";
import { RegisterUserDto } from "../../dtos";
import { AuthRepository} from "../../repository";

interface RegisterUseCase {
        execute(user: RegisterUserDto): Promise<loginUserInterface>;
}

export class Register implements RegisterUseCase {
        constructor(
                private readonly repository: AuthRepository
        ) { }

        execute(user: RegisterUserDto): Promise<loginUserInterface> {
                return this.repository.register(user);
        }

}