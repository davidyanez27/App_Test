import { loginUserInterface } from "@interfaces/auth.interface";
import { LoginUserDto, RegisterUserDto } from "../../dtos";

export abstract class AuthRepository{
    abstract register     ( user  : RegisterUserDto ): Promise<loginUserInterface>;
    abstract login        ( user  : LoginUserDto    ): Promise<loginUserInterface>;
    abstract renewToken   ( token : string          ): Promise<string>;
}