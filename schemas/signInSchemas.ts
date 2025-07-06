import * as z from "zod"

export const signInSchema = z.object({
    identifier: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email" }),
    password: z
        .string()
        .min(1, { message: "Please is required" })
        .min(8, { message: " Password should be minumum of 8 characters" }),

    passwordConfirmation: z
        .string()
        .min(1, { message: "Please confirm your password" })

})
