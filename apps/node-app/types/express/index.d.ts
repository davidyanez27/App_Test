import { UserDto } from '../../src/domain/dtos';


declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}

export {};