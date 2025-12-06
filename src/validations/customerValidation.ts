import z, { ZodType } from "zod"

export class CustomerValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be string!",
            })
            .min(1, {
                error: "Name can not be empty!",
            }),
        phone_number: z
            .string({
                error: "Phone Number must be string!",
            })
            .min(11, {
                error: "Phone Number Minimum 11!",
            }),
    })
}