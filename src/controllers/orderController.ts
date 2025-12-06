import { Request, Response, NextFunction } from "express";
import { orderCreateRequest } from "../models/orderModel";
import { OrderService } from "../services/orderService";

export class OrderController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: orderCreateRequest = req.body as orderCreateRequest
            const response = await OrderService.createOrder(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId)
            const restaurantId = Number(req.params.restaurantId)
            const response = await OrderService.getOrder(customerId, restaurantId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}