import { AuthRepository } from "../../repository";


interface RegisterOAuthUseCase {
    execute(code:string): Promise<string>
}

export class RegisterOAuth implements RegisterOAuthUseCase{
    constructor (
        private readonly repository: AuthRepository
    ) {}
    
    execute(code: string): Promise<string> {
        return this.repository.OAuth2(code);
    }

}