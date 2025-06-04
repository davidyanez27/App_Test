import { UserDto } from "../../dtos";
import { CustomError } from "../../errors/customs.error";


export interface user {
    user: UserDto,
    jwt:string
}


export class UserEntity {

    constructor(
        public username: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public firstName: string,
        public lastName: string,
        public roleId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public parentUserId?: number,

    ) { }

    static fromObject(Payload: { [key: string]: any }): UserEntity {
        const {
            username,
            email,
            emailValidated,
            password,
            firstName,
            lastName,
            roleId,
            createdAt,
            updatedAt,
            parentUserId,
        } = Payload
        

      
        if (!username) throw CustomError.badRequest('Missing username');
        if (!email) throw CustomError.badRequest('Missing email');
        if (emailValidated === undefined) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');
        if (!firstName) throw CustomError.badRequest('Missing firstName');
        if (!lastName) throw CustomError.badRequest('Missing lastName');
        if (!roleId) throw CustomError.badRequest('Missing role');
        if (!createdAt) throw CustomError.badRequest('Missing createdAt');
        if (!updatedAt) throw CustomError.badRequest('Missing updateddAt');

 

        return new UserEntity( username, email,emailValidated, password, firstName, lastName, roleId, createdAt, updatedAt, parentUserId)
    }


}

