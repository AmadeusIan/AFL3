import { Restaurant } from "../../generated/prisma/client"

export interface RestaurantResponse {
    id: number,
    name: string,
    description: string,
    status: boolean,
}

export interface restaurantCreateUpdateRequest {
    name: string,
    description: string,
    status: boolean,
}

export function restaurantResponse(restaurant: Restaurant): RestaurantResponse {
    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        status: restaurant.status,
    }
}