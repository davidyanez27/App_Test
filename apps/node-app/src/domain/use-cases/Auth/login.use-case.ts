import { LoginUserDto } from "../../dtos";
import { user } from "../../entities";
import { AuthRepository } from "../../repository";


interface LoginUseCase {
    execute(user:LoginUserDto): Promise<user>
}

export class LoginUser implements LoginUseCase{
    constructor (
        private readonly repository: AuthRepository
    ) {}
    
    execute(user: LoginUserDto): Promise<user> {
        return this.repository.login(user);
    }

}