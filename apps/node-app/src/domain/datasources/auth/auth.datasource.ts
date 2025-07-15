import { loginUserInterface } from "@interfaces/auth.interface";
import { LoginUserDto, RegisterUserDto } from "../../dtos";


export abstract class AuthDatasource{
    abstract register     ( user : RegisterUserDto ): Promise<loginUserInterface>;
    abstract login        ( user : LoginUserDto    ): Promise<loginUserInterface>;
    abstract renewToken   ( token: string          ): Promise<string>;
    abstract OAuth2       ( token : string          ): Promise<string>;

}