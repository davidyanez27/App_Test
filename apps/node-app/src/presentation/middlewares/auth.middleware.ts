import { NextFunction,  Request,  Response } from "express";
import { Jwt } from "../../config";
import { prisma } from "../../data/PotsgreSQL";

import { UserEntity } from "../../domain/entities";
import { AuthJwtPayloaInterface } from "@interfaces/auth.interface";


export class AuthMiddleware{
    static async ValidateJWT( req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({error:'Missing Token'});
        if (!authHeader.startsWith('Bearer ')) return res.status(401).json({error:'Invalid Bearer token'});

        const token = authHeader.split(' ')[1] || '';
        
        try {
            const payload = await Jwt.validateToken<AuthJwtPayloaInterface>(token);
            if (!payload) return res.status(401).json({error:"Invalid Token"})
            
            const user = await prisma.user.findUnique({where:{uuid:payload.id}})
            if ( !user ) return res.status(401).json({error:"The Token contains Invalid Information"});

            (req as any).user = UserEntity.fromObject(user);
            next();
            
        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal Server Error");
        }
        

    }
}