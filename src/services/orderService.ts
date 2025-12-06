import { ResponseError } from "../error/responseError"
import { orderCreateRequest, orderResponse, OrderRestaurantCustomer, toOrderResponse } from "../models/orderModel"
import { prismaClient } from "../utils/database-util"
import { OrderValidation } from "../validations/orderValidation"
import { Validation } from "../validations/validation"

export class OrderService {

    static async getOrder(customerId: number, restaurantId: number): Promise<orderResponse[]> {
        const where: {
            customer_id?: number,
            restaurant_id?: number,
        } = {}

        if(customerId) where.customer_id = customerId
        if(restaurantId) where.restaurant_id = restaurantId

        const orders = await prismaClient.order.findMany({
            where: where,
            include: {
                restaurant: true,
                customer: true,
            },
            orderBy: { order_time: 'desc' }
        })
        return orders.map((order: OrderRestaurantCustomer) => toOrderResponse(order))
    }

    static async createOrder(reqData: orderCreateRequest): Promise<orderResponse> {
        const validatedData = Validation.validate(
            OrderValidation.CREATE,
            reqData
        )

        const customerCheck = await prismaClient.customer.count({
        where: { id: validatedData.customerId },
        })

        if (customerCheck === 0) {
        throw new ResponseError(404, "Customer not found!");
        }

        const restaurant = await prismaClient.restaurant.findUnique({
        where: { id: validatedData.restaurantId },
        })

        if (!restaurant) {
        throw new ResponseError(404, "Restaurant not found!");
        }

        if (!restaurant.status) {
        throw new ResponseError(400, "Restaurant is currently closed!");
        }

        const order = await prismaClient.order.create({
            data: {
                customer_id: validatedData.customerId,
                restaurant_id: validatedData.restaurantId,
                item_count: validatedData.itemCount,
            },
            include: {
                customer: true,
                restaurant: true,
            },
        });

        return toOrderResponse(order);
    }
}