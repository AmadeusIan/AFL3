import { Restaurant } from "../../generated/prisma/client"
import { ResponseError } from "../error/responseError"
import { restaurantCreateUpdateRequest, restaurantResponse, RestaurantResponse } from "../models/restaurantModel"
import { prismaClient } from "../utils/database-util"
import { RestaurantValidation } from "../validations/restaurantValidation"
import { Validation } from "../validations/validation"

export class RestaurantService {

    static async getRestaurant(restaurantId: number): Promise<RestaurantResponse> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        })
        if (!restaurant) {
            throw new ResponseError(404, "restaurant not found!")
        }
        return restaurantResponse(restaurant)
    }

    static async getAllRestaurant(status?: string): Promise<RestaurantResponse[]>{
        const where: { status?: boolean } = {};

        if (status === 'opened') {
            where.status = true;
        } else if (status === 'closed') {
            where.status = false;
        }

        const restaurants = await prismaClient.restaurant.findMany({
            where: where,
            orderBy: {
                id: 'desc'
            }
        });

        return restaurants.map((restaurant: Restaurant) => restaurantResponse(restaurant));
    }

    static async createRestaurant(reqData: restaurantCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE_UPDATE,
            reqData
        )

        await prismaClient.restaurant.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                status: validatedData.status,
            },
        })

        return "Restaurant created!"
    }

    static async updateRestaurant(restaurantId: number, req: restaurantCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE_UPDATE,
            req
        )

        const restaurant = await prismaClient.customer.findUnique({
            where: { id: restaurantId }
        })
        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found!")
        }

        await prismaClient.restaurant.update({
            where: { id: restaurantId },
            data: {
                name: validatedData.name,
                description: validatedData.description,
                status: validatedData.status,
            },
        })

        return "Restaurant updated!"
    }

    static async deleteRestaurant(restaurantId: number): Promise<string> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        })
        if (!restaurant) {
            throw new ResponseError(404, "restaurant not found!")
        }

        await prismaClient.restaurant.delete({
            where: { id: restaurantId }
        })

        return "restaurant deleted!"
    }
}