import { Request, Response, NextFunction } from "express";
import { customerCreateUpdateRequest } from "../models/customerModel";
import { CustomerService } from "../services/customerService";

export class CustomerController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: customerCreateUpdateRequest = req.body as customerCreateUpdateRequest
            const response = await CustomerService.createCustomer(request)

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
            const response = await CustomerService.getCustomer(customerId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CustomerService.getAllCustomers()
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: customerCreateUpdateRequest = req.body as customerCreateUpdateRequest;
            const customerId = Number(req.params.customerId)

            const response = await CustomerService.updateCustomer(customerId, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId)
            const response = await CustomerService.deleteCustomer(customerId)

            res.status(200).json({
                data: response 
            })
        } catch (error) {
            next(error)
        }
    }
}