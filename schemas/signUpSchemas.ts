import * as z from "zod";
//create objects form your schema
export const signUpSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Please enter a valid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, { message: " Password should be minumum of 8 characters" }),

        passwordConfirmation: z
            .string()
            .min(1, { message: "Please confirm your password" })

    })
    // PREDICATE: gets all the data saved inside the function
    // object.. config
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"],

    });
