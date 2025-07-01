import { CustomError } from "../../errors/customs.error";



class PlanModule{
    constructor(
        public readonly moduleId: number,
        public readonly planId: number,
    ){}
}


export class PlanEntity {

    constructor(
        public name: string,
        public price: string,
        public description: string,
        public planModule: PlanModule[],

    ) { }

    static fromObject(Payload: { [key: string]: any }): PlanEntity {
        const {
            name,
            price,
            description,
            planModule
        } = Payload
        


        if (!name) throw CustomError.badRequest('Missing name');
        if (!price) throw CustomError.badRequest('Missing price');
        if (!description) throw CustomError.badRequest('Missing description');
        if (!planModule) throw CustomError.badRequest('Missing plan_module');

 

        return new PlanEntity( name, price, description, planModule)
    }


}

