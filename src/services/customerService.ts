import { Customer } from "../../generated/prisma/client"
import { ResponseError } from "../error/responseError"
import { customerCreateUpdateRequest, CustomerResponse, customerResponse } from "../models/customerModel"
import { prismaClient } from "../utils/database-util"
import { CustomerValidation } from "../validations/customerValidation"
import { Validation } from "../validations/validation"

export class CustomerService {

    static async getCustomer(customerId: number): Promise<CustomerResponse> {
        const customer = await prismaClient.customer.findUnique({
            where: { id: customerId }
        })
        if (!customer) {
            throw new ResponseError(404, "Customer not found!")
        }
        return customerResponse(customer)
    }

    static async getAllCustomers(): Promise<CustomerResponse[]> {
        const customers = await prismaClient.customer.findMany()
        return customers.map((customer: Customer) => customerResponse(customer))
    }

    static async createCustomer(reqData: customerCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            CustomerValidation.CREATE_UPDATE,
            reqData
        )

        await prismaClient.customer.create({
            data: {
                name: validatedData.name,
                phone_number: validatedData.phone_number,
            },
        })

        return "Customer created!"
    }

    static async updateCustomer(customerId: number, req: customerCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            CustomerValidation.CREATE_UPDATE,
            req
        )

        const customer = await prismaClient.customer.findUnique({
            where: { id: customerId }
        })
        if (!customer) {
            throw new ResponseError(404, "Customer not found!")
        }

        await prismaClient.customer.update({
            where: { id: customerId },
            data: {
                name: validatedData.name,
                phone_number: validatedData.phone_number,
            },
        })

        return "Customer updated!"
    }

    static async deleteCustomer(customerId: number): Promise<string> {
        const customer = await prismaClient.customer.findUnique({
            where: { id: customerId }
        })
        if (!customer) {
            throw new ResponseError(404, "Customer not found!")
        }

        await prismaClient.customer.delete({
            where: { id: customerId }
        })

        return "Customer deleted!"
    }
}