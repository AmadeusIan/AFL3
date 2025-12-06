import { Customer } from "../../generated/prisma/client"


export interface CustomerResponse {
    id: number
    name: string
    phone_number: string 
}

export function customerResponse(customer: Customer): CustomerResponse {
    return {
        id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number,
    }
}

export interface customerCreateUpdateRequest {
    name: string,
    phone_number: string,
}