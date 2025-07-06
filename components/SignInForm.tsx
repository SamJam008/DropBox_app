"use client"

import { signInSchema } from "@/schemas/signInSchemas"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

export default function SignInForm() {
    const router = useRouter()
    const { signIn, isLoaded, setActive } = useSignIn()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    const {
        register,
        handleSubmit
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""

        }
    })

    const onSubmit = async (data: z.infer<typeof
        signInSchema>) => {
        if (!isLoaded) return
        setIsSubmitting(true)
        setAuthError(null)

        try {
            const result = await signIn.create({
                identifier: data.identifier,
                password: data.password
            })
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            } else {
                console.error("Sign-in incomplete:", result);
                setAuthError("Sign in error");
            }

        } catch (error: any) {
            setAuthError(
                error.errors?.[0]?.message || "an error occured while signin process"

            )

        } finally {
            setIsSubmitting(false)

        }
    }



    return (
        <h1> Return a sign in form</h1>
    )
}