import { CustomError } from "../../errors";
import { regularExps } from '../../../config';

export class PayloadUserDto{
    constructor (
        public readonly username: string
    ){}

    static create( payload: {[key: string]:any}):[string?, PayloadUserDto?]{
        const { username } = payload;
        if (!username ) throw CustomError.badRequest( "username is required" )
        if( !regularExps.username.test(username) ) return ['Invalid username format, please avoid using special characters'] 

        return [undefined, new PayloadUserDto(username)]
    }


}