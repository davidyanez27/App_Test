import { loginUserInterface } from "@interfaces/auth.interface";
import { UserEntity } from "../../domain/entities";
import { Jwt } from "../../config/";
import { CustomError } from "../../domain/errors/";
import { UserDto } from "../../domain/dtos/";

export class TokenService {
  async CreateToken(user: UserEntity): Promise<loginUserInterface> {
    const { uuid, firstName, lastName, roleId } = user;

    const token = await Jwt.generateToken({
      id: uuid,
      firstName,
      lastName,
      roleId,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    const [error, userDto] = UserDto.create(user);
    if (error) throw CustomError.internalServer(error);

    return {
      user: userDto!,
      token: token,
    };
  }
}
