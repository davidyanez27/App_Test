import { AuthRepository } from "../../repository";

interface RenewTokenUseCase {
        execute(token: String): Promise<string>;
}

export class RenewToken implements RenewTokenUseCase {
        constructor(
                private readonly repository: AuthRepository
        ) { }

        execute(token: string): Promise<string> {
                return this.repository.renewToken(token);
        }

}