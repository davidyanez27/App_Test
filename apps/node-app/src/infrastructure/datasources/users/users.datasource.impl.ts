import { UsersDatasource } from '../../../domain/datasources';
import { PaginationDto, RegisterUserDto, UpdateUserDto, UserDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/customs.error';
import { bcryptAdapter, envs, Jwt, UUID } from '../../../config';
import { prisma } from '../../../data/PotsgreSQL';
import { EmailService } from '../../../presentation/Services';
import { FindAllUsersResponseInterface, RegisterUserInterface } from '@interfaces/auth.interface';
import { UserEntity } from '../../../domain/entities/';

export class UsersDatasourceImpl implements UsersDatasource {

    constructor (
        private readonly emailService : EmailService,
    ){}

    async create(User: RegisterUserDto, ParentUUID: string): Promise<RegisterUserInterface> {
        const {roleId, ...restUserData} = User;

        const parentUserId = await this.getParentUserByUUID(ParentUUID)

        const existUser = await prisma.user.findUnique({ where: { email: User.email }  })
        if (existUser) throw CustomError.badRequest('email alredy exists');

        const existUserName = await prisma.user.findUnique({ where: { username: User.username }  })
        if (existUserName) throw CustomError.badRequest('username alredy exists');

        const validRoled = await prisma.role.findUnique({ where: { id: User.roleId } })
        if (!validRoled) throw CustomError.badRequest("This role doesn't exists valid role");

        const newUser = await prisma.user.create(
            {
                data: {
                    ...restUserData,
                    uuid:UUID.generate(),
                    emailValidated: false,
                    password: bcryptAdapter.hash(User.password),
                    parentUser: {
                        connect: {
                            id: parentUserId
                        }
                    },
                    role: {
                        connect:{
                            id: roleId
                        }
                    },
                }
            }
        )

        return {
            user: UserEntity.fromObject(newUser),
            message:"User Suscesfully created"
        };

    }

    async findAll(ParentUUID: string, Pagination: PaginationDto): Promise<FindAllUsersResponseInterface> {
        const {page, limit} = Pagination;
        const id = await this.getParentUserByUUID(ParentUUID);
        const skip = (page - 1) * limit 
        const usersFomDB = await prisma.user.findMany({
            where:{parentUserId:id},
            skip,
            take: limit
        })
        if (!usersFomDB) throw CustomError.notFound("Users not found");

        const total = await prisma.user.count({where:{parentUserId: id}})

        const users = usersFomDB.map((user)=>{
            const [error, dto]= UserDto.create(user)
            if (error || !dto) throw CustomError.notFound(error || "Invalid user data");
            return dto;
        })

        return{
            page,
            limit,
            total,
            next: `http://localhost:3000/api/users/findAll?page=${page + 1}&limit=${limit}`,
            prev: (page - 1 >0) ? `http://localhost:3000/api/users/findAll?page=${page - 1}&limit=${limit}`: null,
            users
        }
    }

    async findById(UserUUID: string, ParentUUID: string ): Promise<UserDto> {
        
        const id = await this.getParentUserByUUID(ParentUUID);


        const userFound = await prisma.user.findFirst({
            where:{
                uuid: UserUUID,
                OR:[
                    {parentUserId: id},
                    {id}
                ]
            }
        })

        if (!userFound) throw CustomError.notFound("User not found")

        const [error, dto] = UserDto.create(userFound!)
        if (error || !dto ) throw CustomError.notFound(error || "Invalid user data")
        return dto;

    }

    async updateById(UserUUID: string, UserDto: UpdateUserDto, ParentUUID: string): Promise<UpdateUserDto> {

        const id = await this.getParentUserByUUID(ParentUUID!)        
        const userFound = await prisma.user.findFirst({
            where:{
                uuid: UserUUID,
                OR:[
                    {parentUserId: id},
                    {id}
                ]
            }
        })

        if (!userFound) throw CustomError.notFound("User not found")
        try {
            const userUpdated = await prisma.user.update({
            where:{
                uuid: UserUUID,
                OR:[
                    { parentUserId: id },
                    { id }
                ]

            },
            data: {...UserDto}})

            const [error, dto] = UpdateUserDto.create(userUpdated);
            if ( error || !dto) throw CustomError.notFound(error! );
        
            return dto;
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('username')) throw CustomError.badRequest('Username already exists');
            throw CustomError.internalServer(error.message || 'Unexpected error')
        }

    }

    async deleteById(UserUUID: string, ParentUUID: string): Promise<void> {
        const id = await this.getParentUserByUUID(ParentUUID!)        

        const userFound = await prisma.user.findUnique({where:{uuid:UserUUID}})

        if (!userFound) throw CustomError.notFound("User not found");
        try {
            const activeChildren = await prisma.user.count({
                where:{parentUserId: userFound.id, IsActive:true },
            })
            if( activeChildren ) throw CustomError.conflict("Cannot deactivate user with active child users")

            const userUpdated = await prisma.user.update({
                where:{uuid:UserUUID,
                    OR:[
                        {parentUserId: id},
                        { id }
                    ]
                },
                data: {IsActive: false}
            })
            const [error, dto] = UpdateUserDto.create(userUpdated);
            if ( error || !dto) throw CustomError.notFound(error! );
        

        } catch (error: any) {
            if( error.code === 'P2025') throw CustomError.notFound('User not found');
            throw CustomError.internalServer(error.message || 'Unexpected error')
        }

        
    }

    // //Find
    // async findByUsername(username: string): Promise<void> {
    //     const existUsername = await prisma.user.findUnique({ where: { username }})
    //     if(!existUsername) throw CustomError.badRequest("user not found");

    // }        
    
    // //Check permissions
    // private async CheckPermissions(username: string, expectedRole: string, expectedParentId:string): Promise<boolean> {
        
    //     const user = await prisma.user.findUnique({ 
    //         where: { username }, 
    //         select: {
    //             role: {
    //                 select:{
    //                     name: true,
    //                 }
    //             },
    //             parentUser:true
    //         },
    //     });

    //     if (!user) return false

    //     return user.role.name === expectedRole && user.parentUser?.username === expectedParentId;
    // }        
    
    private async getParentUserByUUID(uuid: string,): Promise<number>{
        const parentUser = await prisma.user.findUnique({
            where:{uuid},
            select: {
                id:true
            }
        })
        if (!parentUser) throw CustomError.internalServer("User related to the JWT not found")
        
        return parentUser.id
    }





}