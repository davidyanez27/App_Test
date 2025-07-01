import { CustomError } from "../../errors/customs.error";

export class RoleEntity {

    constructor(
        public name: string,
        public canRead: boolean,
        public canWrite: boolean,
    ) { }

    static fromObject(Payload: { [key: string]: any }): RoleEntity {
        const {
            name,
            canRead,
            canWrite
        } = Payload
        
        if (!name) throw CustomError.badRequest('Missing name');
        if (!canRead || !canWrite) throw CustomError.badRequest('Missing access control rule value');

        return new RoleEntity( name, canRead, canWrite)
    }


}

