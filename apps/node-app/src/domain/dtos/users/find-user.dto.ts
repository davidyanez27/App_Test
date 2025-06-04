export class FindUserDto {
    constructor(
        public readonly username:string,
        public readonly password: string,


    ){}

    static FindUser ( payload: { [key:string]:any}): [string?, FindUserDto?]{
        const{ password, username} = payload;

        
        if( !username ) return ['username property is required', undefined];
        if( !password ) return ['password property is required', undefined];
        return [undefined, new FindUserDto(username, password)]
    }

}