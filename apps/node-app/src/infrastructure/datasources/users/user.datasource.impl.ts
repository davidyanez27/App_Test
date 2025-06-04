import { UserDatasource } from '../../../domain/datasources';
import { user, UserEntity } from '../../../domain/entities';
import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto, UserDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/customs.error';
import { bcryptAdapter, envs, Jwt } from '../../../config';
import { prisma } from '../../../data/PotsgreSQL';
import { EmailService } from '../../../presentation/Email';

export class UserDatasourceImpl implements UserDatasource {

    constructor (
        private readonly emailService : EmailService,
    ){}
    
    //Register
    async create(user: RegisterUserDto): Promise<user> {

        const existUser = await prisma.user.findUnique({ where: { email: user.email }  })
        if (existUser) throw CustomError.badRequest('email alredy exists');

        const existUserName = await prisma.user.findUnique({ where: { username: user.username }  })
        if (existUserName) throw CustomError.badRequest('username alredy exists');

        const validRoled = await prisma.role.findUnique({ where: { id: user.roleId } })
        if (!validRoled) throw CustomError.badRequest("This role doesn't exists valid role");


        const newUser = await prisma.user.create(
            {
                data: {
                    ...user,
                    emailValidated: false,
                    password: bcryptAdapter.hash(user.password),
                }
            }
        )
        // await this.sendValidationEmail( newUser.email )        
        return this.CreateToken(UserEntity.fromObject(newUser));

    }

    //Login
    async findById(user: LoginUserDto ): Promise<user> {

        const {email} = user        

        const existUser = await prisma.user.findUnique({where: { email }})
        if(!existUser) throw CustomError.badRequest('Invalid Credentials');
        
        const isMatching = bcryptAdapter.compare(user.password, existUser.password);
        if (!isMatching) throw CustomError.badRequest('Invalid Credentials');

        return this.CreateToken(UserEntity.fromObject(existUser))


    }

    //Update a User
    async updateById(user: UpdateUserDto ): Promise<void> {
        
        const {username} = user;
        this.findByUsername(username!)


        await prisma.user.update({
            where: {username},
            data:{...user}
        })

    }


    //Deactivate a User
    async deleteById(user: DeleteUserDto): Promise<void> {
        const {username} = user;

        this.findByUsername(username)

        await prisma.user.update({
            where: { username}, 
            data:{...user}
        });
        
    }

    //Find
    async findByUsername(username: string): Promise<void> {
        const existUsername = await prisma.user.findUnique({ where: { username }})
        if(!existUsername) throw CustomError.badRequest("user not found");

    }        
    
    //Check permissions
    private async CheckPermissions(username: string, expectedRole: string, expectedParentId:string): Promise<boolean> {
        
        const user = await prisma.user.findUnique({ 
            where: { username }, 
            select: {
                role: {
                    select:{
                        name: true,
                    }
                },
                parentUser:true
            },
        });

        if (!user) return false

        return user.role.name === expectedRole && user.parentUser?.username === expectedParentId;
    }        
    
    private async CreateToken(user: UserEntity,): Promise<user>{
        const token = await Jwt.generateToken({username: user.username})
        if (!token) throw CustomError.internalServer("Error while creating JWT")
        
        const [error, userDto] = UserDto.userDto(user)
        if(error) throw CustomError.internalServer(error)

        return {
            user: userDto!, 
            jwt:token
        }
    }

     async sendValidationEmail( email: string): Promise<void>{
        const token = await Jwt.generateToken({email});
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your Email</h1>
            <p>Please click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>

        `
        const options = {
            to: email, 
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSet = await this.emailService.sendEmail(options);
        if (!isSet) throw CustomError.internalServer('Error sending email');

    }



}