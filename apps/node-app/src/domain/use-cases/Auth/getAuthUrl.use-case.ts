import { OAuth2Service } from "../../../presentation/Services";
import { CustomError } from '../../errors/customs.error';

interface GetAuthUrlUseCase {
    execute(email:string): Promise<string>
}

export class GetAuthUrl implements GetAuthUrlUseCase{
    constructor (
        private readonly oauth2Service: OAuth2Service
    ) {}
    
    async execute(): Promise<string> {
        const url = await this.oauth2Service.generateAtuhUrl();
        if (!url) throw CustomError.internalServer('Error generating the url');

        return url

    }

}