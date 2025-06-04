import jwt, { Secret } from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class Jwt {

    static async generateToken(payload:any, duration:string = '2h'): Promise<string | null> {

        return new Promise((resolve)=>{
            jwt.sign(payload, JWT_SEED as Secret, {expiresIn: duration} as jwt.SignOptions, (err, token)=>{
                if (err) return resolve(null);
                resolve(token!);
            })
        })
    }

    static validateToken(token: string): Promise<string | jwt.JwtPayload | undefined | null>{
        return new Promise((resolve)=>{
            jwt.verify( token, JWT_SEED, (err,decode)=>{
                if( err ) return resolve(null);
                resolve(decode);
            });
        });
    }
}