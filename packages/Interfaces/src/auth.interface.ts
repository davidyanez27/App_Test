import { UserDto } from '../../../apps/node-app/src/domain/dtos/users/user.dto';
import { RegisterUserDto } from '../../../apps/node-app/src/domain/dtos/auth/register-user.dto';


export interface SignInFormDataInterface {
  email: string;
  password: string;
}

export interface SignUpFormDataInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthJwtPayloaInterface {
  id: string;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
}

export interface loginUserInterface {
    user: UserDto,
    token:string
}

export interface RegisterUserInterface {
    user: RegisterUserDto,
    message:string
}

export interface FindAllUsersResponseInterface {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: string | null;
  users: UserDto[];
}


