import { User } from "@prisma/client";
import { regularExps } from "../../../config";

export class UserDto {
    constructor(

        public readonly username   : string,
        public readonly email      : string,
        public readonly firstName  : string,
        public readonly lastName   : string,
        public readonly roleId     : number,
        // public readonly IsActive   : boolean,
        public readonly parentUserId    ?: User,

        
    ){}


    static create( props: {[key:string]:any}): [string?, UserDto?]{
        const {username, email, firstName, lastName, roleId, parentUserId, IsActive } = props;

        if( !username ) return ['username property is required'];
        if( !regularExps.email.test(email) ) return ['email property is required'];
        if( !firstName ) return ['firstName property is required'];
        if( !lastName ) return ['lastName property is required'];
        if( !roleId ) return ['role property is required'];
        if (isNaN(roleId)) return ['role property must be a integer'];
        // if (typeof IsActive !== 'boolean') return ['IsActive property must be a boolean'];
        
        return [undefined, new UserDto( username, email, firstName, lastName, roleId, parentUserId)];
    }

}

