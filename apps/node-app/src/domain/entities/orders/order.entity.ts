import { CustomError } from "../../errors/customs.error";
import { UserEntity } from "../users/user.entity";


export class OrderEntity {

    constructor(
        public orderDate: string,
        public status: string,
        public customerId: string,
        public userId: UserEntity
    ) { }

    static fromObject(Payload: { [key: string]: any }): OrderEntity {
        const {
            orderDate,
            status,
            customerId,
            userId,
        } = Payload
        

        if (!orderDate) throw CustomError.badRequest('Missing order date');
        if (!status) throw CustomError.badRequest('Missing status');
        if (!customerId) throw CustomError.badRequest('Missing customer id');
        if (!userId) throw CustomError.badRequest('Missing user identifier');

 

        return new OrderEntity( orderDate, status, customerId, userId)
    }


}

