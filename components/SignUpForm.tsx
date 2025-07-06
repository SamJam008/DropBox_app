"use client"

import { useForm } from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import { z } from "zod"

//zod custom schema
import { signUpSchema } from "@/schemas/signUpSchemas"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider"
import { Alert } from "@heroui/alert"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { button } from "@heroui/theme"
// making component avaliable to other files
export default function SignUpForm() {
    const router = useRouter()
    const [verifying, setVerifying] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [authError, setAuthError] = useState<string | null>(null)
    const [verificationError, setVerificationError] = useState<string | null>(null)
    const { signUp, isLoaded, setActive } = useSignUp()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        if (!isLoaded) return;
        setIsSubmitting(true)
        setAuthError(null)

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password
            })
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })
            setVerifying(true)

        } catch (error: any) {
            console.error("Signup error:", error)
            setAuthError(
                error.errors?.[0]?.message || "An error occured during the signup.please try again"
            )

        } finally {
            setIsSubmitting(false)
        }

    };

    const handleVerificationSubmit = async (
        e: React.FormEvent<HTMLFormElement>) => {
        if (!isLoaded || !signUp) return
        setIsSubmitting(true);
        setAuthError(null);

        try {
            const result = await signUp.
                attemptEmailAddressVerification({
                    code: verificationCode
                })
            //console result
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                router.push("/dashboard")
            }
            else {
                console.error("Verification incomplete", result)
                setVerificationError("Verification could not be complete")
            }

        } catch (error: any) {
            setVerificationError(error.errors?.[0]?.message || "An error occured during the signup.please try again")

        } finally {
            setIsSubmitting(false)
        }
    }

    if (verifying) {
        return (
            <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
                <CardHeader >
                    <h1>
                        Verify Your Email
                    </h1>
                    <p> We've sent a verification code to your email</p>
                </CardHeader>
                <CardBody >{
                    verificationError && (
                        <div>


                            <p>{verificationError}</p>
                        </div>)}</CardBody>
                        <form onSubmit={handleVerificationSubmit}>
                            <div>
                                <label>Verification Code</label>
                                <Input id="verification code"
                                type="text"
                                placeholder="Enter the 6-digit code"
                                value={verificationCode}
                                onChange={(e)=> setVerificationCode(e.target.value)}/>
                                
                            </div>
                            <Button>
                                {isSubmitting ? "Verifying..":"verify email"}
                            </Button>
                        </form>
                        <div>
                            <p>
                                didnt receive a code?{" "}
                                <button
                                onClick={ async() =>{
                                    if(signUp){
                                        await signUp.
                                        prepareEmailAddressVerification({
                                            strategy:"email_code",
                                        });
                                    }
                                }}> Resend code </button>

                                
                            </p>
                        </div>

            </Card>

        )
    }
    return (
        <h1>
            signup form with email and other fields
        </h1>
    )

}