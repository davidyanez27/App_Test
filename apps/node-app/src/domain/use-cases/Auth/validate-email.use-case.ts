import { Jwt } from "../../../config"
import { prisma } from "../../../data/PotsgreSQL"
import { CustomError } from "../../errors/customs.error"

interface ValidateEmailUseCase {
    execute( token: string ):Promise<string>
}

export class ValidateEmail implements ValidateEmailUseCase{
    async execute(token: string): Promise<string> {
        const payload = await Jwt.validateToken(token)
        if ( !payload ) throw CustomError.unauthorized("Invalid token")

        
        const { email } = payload as { email:string };
        if( !email ) throw CustomError.internalServer("Email not in token")

        const user = await prisma.user.findUnique({where: {email}})
        if( !user ) throw CustomError.internalServer("User not exists")

        if ( user.emailValidated ) return "Email is already verified"
        
        await prisma.user.update({
                where: {email},
                data: {emailValidated: true}
        })
        return "Your email has been successfully verified!"


    }

}