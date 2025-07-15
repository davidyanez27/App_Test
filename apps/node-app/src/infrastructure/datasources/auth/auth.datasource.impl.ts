import { AuthDatasource } from '../../../domain/datasources';
import { UserEntity } from '../../../domain/entities';
import { LoginUserDto, RegisterUserDto} from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/customs.error';
import { bcryptAdapter, Jwt, UUID } from '../../../config';
import { prisma } from '../../../data/PotsgreSQL';
import { EmailService, OAuth2Service, TokenService} from '../../../presentation/Services';
import { AuthJwtPayloaInterface, loginUserInterface } from '@interfaces/auth.interface';


export class AuthDatasourceImpl implements AuthDatasource {

    constructor (
        private readonly emailService : EmailService,
        private readonly tokenService : TokenService,
        private readonly oauth2Service: OAuth2Service,
    ){}
    async OAuth2(code: string): Promise<string> {
        const credentials = await this.oauth2Service.getTokens(code);
        if( !credentials ) throw CustomError.internalServer("Error getting credentials");

        const googleUser = await this.oauth2Service.getUserInfo(credentials!);
        const {email, given_name, family_name} = googleUser;
        if( !googleUser ) throw CustomError.internalServer("Error getting Info");

        const existUser = await prisma.user.findUnique({where:{ email}})
        if (existUser) {
            const {token} = await this.tokenService.CreateToken(UserEntity.fromObject(existUser))
            return token
        }


        const username = email.split("@")[0]
        const existUsername = await prisma.user.findUnique({ where: { username }  })
        if (existUsername) throw CustomError.badRequest('username alredy exists');

        const newUser = await prisma.user.create(
            {
                data: {
                        uuid:UUID.generate(),
                        emailValidated: false,
                        password: "google",
                        parentUser: undefined,
                        firstName: given_name,
                        lastName: family_name,
                        email,
                        username,
                        roleId:1
                }
            }
        )
        
        return "good";
    }
    
    async register(user: RegisterUserDto): Promise<loginUserInterface> {

        const existUser = await prisma.user.findUnique({ where: { email: user.email }  })
        if (existUser) throw CustomError.badRequest('email alredy exists');

        const existUsername = await prisma.user.findUnique({ where: { username: user.username }  })
        if (existUsername) throw CustomError.badRequest('username alredy exists');

        const validRoled = await prisma.role.findUnique({ where: { id: user.roleId } })
        if (!validRoled) throw CustomError.badRequest("This role doesn't exists valid role");


        const newUser = await prisma.user.create(
            {
                data: {
                    ...user,
                    uuid:UUID.generate(),
                    emailValidated: false,
                    password: bcryptAdapter.hash(user.password),
                    roleId:user.roleId,
                    
                }
            }
        )
        // await this.sendValidationEmail( newUser.email )        
        return this.tokenService.CreateToken(UserEntity.fromObject(newUser));

    }

    async login(user: LoginUserDto ): Promise<loginUserInterface> {

        const {email} = user        

        const existUser = await prisma.user.findUnique({where: { email}})
        if(!existUser) throw CustomError.badRequest('Invalid Credentials');

        if(existUser.IsActive === false) throw CustomError.forbidden('This user are deactivated please contact you admin')
        
        const isMatching = bcryptAdapter.compare(user.password!, existUser.password!);
        if (!isMatching) throw CustomError.badRequest('Invalid Credentials');

        return this.tokenService.CreateToken(UserEntity.fromObject(existUser))


    }

    async renewToken(token: string): Promise<string> {
        if (!token) throw CustomError.internalServer('Error getting token');
        
        const decode = await Jwt.validateToken<AuthJwtPayloaInterface>(token);
        if (!decode || typeof decode !== 'object' || !('id' in decode)) throw CustomError.internalServer('Invalid token');

        const {id, firstName, lastName, roleId} = decode;

        
        const newtoken = await Jwt.generateToken({id, firstName, lastName, roleId})
        if (!newtoken) throw CustomError.internalServer("Error while creating JWT")


        return newtoken
         
    }



}