import { loginUserInterface } from "@interfaces/auth.interface";
import { LoginUserDto } from "../../dtos";
import { AuthRepository } from "../../repository";


interface LoginUseCase {
    execute(user:LoginUserDto): Promise<loginUserInterface>
}

export class LoginUser implements LoginUseCase{
    constructor (
        private readonly repository: AuthRepository
    ) {}
    
    execute(user: LoginUserDto): Promise<loginUserInterface> {
        return this.repository.login(user);
    }

}