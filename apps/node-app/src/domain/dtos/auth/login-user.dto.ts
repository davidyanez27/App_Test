export class LoginUserDto {
    constructor(
        public readonly email:string,
        public readonly password: string,


    ){}

    static login ( payload: { [key:string]:any}): [string?, LoginUserDto?]{
        const{ password, email} = payload;

        
        if( !email ) return ['email property is required', undefined];
        if( !password ) return ['password property is required', undefined];
        return [undefined, new LoginUserDto(email, password)]
    }

}