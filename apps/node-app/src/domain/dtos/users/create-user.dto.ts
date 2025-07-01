import { regularExps } from "../../../config";

export class CreateUserDto {
    constructor(

        public readonly username   : string,
        public readonly email      : string,
        public readonly password   : string,
        public readonly firstName  : string,
        public readonly lastName   : string,
        public readonly roleId     : number,

    ){}


    static create( props: {[key:string]:any}): [string?, CreateUserDto?]{
        const {username, email, password, firstName, lastName, role } = props;

        if( !username ) return ['username property is required'];
        if( !regularExps.username.test(username) ) return ['Invalid username format, please avoid using special characters'] 
        if( !regularExps.email.test(email) ) return ['email property is required'];
        if( !password ) return ['password property is required'];
        if( !regularExps.password.test(password)) return ['password contains at least eight characters, one special characters, uppercase and one number'];
        if( !firstName ) return ['firstName property is required'];
        if( !lastName ) return ['lastName property is required'];
        if( !role ) return ['role property is required'];
        if (isNaN(role)) return ['role property must be a integer'];
        if (role < 0) return ['role property must be a valid positive integer'];

        
        return [undefined, new CreateUserDto( username, email, password, firstName, lastName, role)];
    }

}

