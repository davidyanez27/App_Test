import { regularExps } from "../../../config";
import { prisma } from "../../../data/PotsgreSQL";

export class RegisterUserDto {
    constructor(

        public readonly username   : string,
        public readonly email      : string,
        public readonly password   : string,
        public readonly firstName  : string,
        public readonly lastName   : string,
        public readonly roleId     : number,

    ){}


    static create( props: {[key:string]:any}): [string?, RegisterUserDto?]{
        const {username, email, password, firstName, lastName, role } = props;

        if( !username ) return ['username property is required'];
        if( !regularExps.email.test(email) ) return ['email property is required'];
        if( !password ) return ['password property is required'];
        if( !regularExps.password.test(password)) return ['password contains at least eight characters, one special characters, uppercase and one number'];
        if( !firstName ) return ['firstName property is required'];
        if( !lastName ) return ['lastName property is required'];
        if( !role ) return ['role property is required'];
        if (isNaN(role)) return ['role property must be a integer'];
        
        return [undefined, new RegisterUserDto( username, email, password, firstName, lastName, role)];
    }

}

