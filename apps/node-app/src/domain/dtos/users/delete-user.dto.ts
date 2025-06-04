import { CustomError } from "../../errors/customs.error";

export class DeleteUserDto{
    constructor (
        public readonly username: string
    ){}

    static Delete( payload: {[key: string]:any}):[string?, DeleteUserDto?]{
        const { username } = payload;
        if (!username ) throw CustomError.badRequest( "username is required" )

        return [undefined, new DeleteUserDto(username)]
    }


}