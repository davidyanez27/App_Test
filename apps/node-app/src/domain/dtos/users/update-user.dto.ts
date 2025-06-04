export class UpdateUserDto{

    constructor(
        public readonly username   ?: string,
        public readonly firstName  ?: string,
        public readonly lastName   ?: string,
        public readonly roleId     ?: number,
    ){}

    static update(payload:{[key:string]:any}):[string?,UpdateUserDto?]{
        const { username, firstName, lastName, role} = payload;

        if( !username ) return ['username property is required'];
        if( !firstName ) return ['firstName property is required'];
        if( !lastName ) return ['lastName property is required'];
        if( !role ) return ['role property is required'];
        if (isNaN(role)) return ['role property must be a integer'];

        return [undefined, new UpdateUserDto(username,firstName,lastName, role)]
    }

}