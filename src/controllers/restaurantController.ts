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
            const status = req.query.status as string | undefined;
            if(status === undefined) {
                throw new ResponseError(
                    400, "Status should be opened/closed"
                );
            }
            
            const response = {
                data: []
            }
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
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