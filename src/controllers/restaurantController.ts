import { Request, Response, NextFunction } from "express";
import { restaurantCreateUpdateRequest } from "../models/restaurantModel";
import { RestaurantService } from "../services/restaurantService";
import { ResponseError } from "../error/responseError";
import { da } from "zod/v4/locales";

export class RestaurantController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: restaurantCreateUpdateRequest = req.body as restaurantCreateUpdateRequest
            const response = await RestaurantService.createRestaurant(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

     static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: restaurantCreateUpdateRequest = req.body as restaurantCreateUpdateRequest;
            const restaurantId = Number(req.params.restaurantId)

            const response = await RestaurantService.updateRestaurant(restaurantId, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId)
            const response = await RestaurantService.getRestaurant(restaurantId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getOpenClose(req: Request, res: Response, next: NextFunction) {
    try {
        let status: string | undefined;
        if (req.path.endsWith("/opened")) status = "opened";
        else if (req.path.endsWith("/closed")) status = "closed";

        if (status && status !== 'opened' && status !== 'closed') {
            throw new ResponseError(
                400, "Status should be opened/closed"
            );
        }

        const response = await RestaurantService.getAllRestaurant(status);
        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }
}

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId)
            const response = await RestaurantService.deleteRestaurant(restaurantId)

            res.status(200).json({
                data: response 
            })
        } catch (error) {
            next(error)
        }
    }
}