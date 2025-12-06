import z, { ZodType } from "zod"

export class RestaurantValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Title must be string!",
            })
            .min(1, {
                error: "Title can not be empty!",
            }),
        description: z
            .string({
                error: "Title must be string!",
            })
            .min(1, {
                error: "Title can not be empty!",
            }),
        status: z
            .boolean({
                error: "Title must be open/close!",
            })
            .optional(),
    })
}