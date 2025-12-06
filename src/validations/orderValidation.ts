import z, { ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
            customerId: z
                .number({
                    error: "Customer ID must be number!",
                })
                .min(1, {
                    error: "Customer ID can not be empty!",
                }),
            restaurantId: z
                .number({
                    error: "Restaurant ID must be number!",
                })
                .min(1, {
                    error: "Restaurant ID can not be empty!",
                }),
            itemCount: z
                .number({
                    error: "item Count must be number!",
                })
                .min(1, {
                    error: "item Count minimal 1!",
                })
        })
}