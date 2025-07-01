import { regularExps } from '../../../config';
export class UpdateUserDto{

    constructor(
        public readonly username   ?: string,
        public readonly email      ?: string,
        public readonly firstName  ?: string,
        public readonly lastName   ?: string,
        public readonly roleId     ?: number,
    ){}

    static create(payload:{[key:string]:any}):[string?,UpdateUserDto?]{
        const { username, email, firstName, lastName, roleId} = payload;

        if( username && !regularExps.username.test(username) ) return ['Invalid username format, please avoid using special characters'] 
        if( email && !regularExps.email.test(email) ) return ['Invalid email format'];
        if( firstName && !regularExps.string.test(firstName) ) return ['First name must contain only letters'];
        if( lastName && !regularExps.string.test(lastName)) return ['last name must contain only letters'];
        if( roleId !== undefined) {
            if (isNaN(roleId)) return ['Role property must be an integer'];
            if (roleId < 0) return ['Role property must be a valid positive integer'];
        }

        return [undefined, new UpdateUserDto(username, email, firstName, lastName, roleId)]
    }

}