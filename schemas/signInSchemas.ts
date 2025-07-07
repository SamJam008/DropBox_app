import * as z from "zod"
//zod is a ts validation library
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

}).refine((data)=> data.password === data.passwordConfirmation,{
    message: "Passwords do no match",
    path: ["passwordConfirmation"],// tells zod where to show the error
})
//export type file=  z.infer<typeof signInSchema>
