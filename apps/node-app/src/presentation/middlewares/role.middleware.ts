import { NextFunction, Request, Response } from "express";

import { UserDto } from "../../domain/dtos";
import { prisma } from '../../data/PotsgreSQL/';

export class CheckRolesMiddleware{
    static CheckRole(expectedRole: string){
    return async (req: Request, res: Response, next: NextFunction)=>{
        const user = (req as any).user as UserDto

        if(!user) return res.status(401).json({error: "The rquest missing User Information"});
        if (!user.roleId) return res.status(401).json({error: "The request missing the User role"})

        try {
            const userDB = await prisma.user.findUnique({ 
                where: { username: user.username }, 
                select: {
                    role: {
                        select:{
                            name: true,
                        }
                    },
                    parentUser:true
                },
            });
            if ( !userDB ) return res.status(401).json({error:"The rquest contains Invalid Information"});
            if (userDB.role.name !== expectedRole) return res.status(403).json({error: "This user missing roles to perfom this action"})
            
            next()

        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal Server Error");
        }



        }

    }

}