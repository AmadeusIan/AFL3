import { Customer, Order, Restaurant } from "../../generated/prisma/client"

export type OrderRestaurantCustomer = Order & {
    restaurant: Restaurant;
    customer: Customer;
}

export interface orderResponse {
    id: number,
    customerName: string,
    restaurantName: string,
    itemCount: number,
    orderTime: string,
    estTime: string,
}

export interface orderCreateRequest {
    customerId: number,
    restaurantId: number,
    itemCount: number,
}

function calculatedEstTime(itemsCount: number, orderTime: Date): string {
    const minutes = (itemsCount * 10) + 10
    const estDate = new Date(orderTime)
    estDate.setMinutes(estDate.getMinutes() + minutes)

    return estDate.toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

export function toOrderResponse(order: OrderRestaurantCustomer): orderResponse {
    const formatOrderTime = order.order_time.toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

    return {
        id: order.id,
        customerName: order.customer.name,
        restaurantName: order.restaurant.name,
        itemCount: order.item_count,
        orderTime: formatOrderTime,
        estTime: calculatedEstTime(order.item_count, order.order_time)
    }
}