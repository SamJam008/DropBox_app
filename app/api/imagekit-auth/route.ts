import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit"
import { env } from "process";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENPOINT || ""
});
export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" },
                { status: 401 }
            )
        }
        const authParams = imagekit.getAuthenticationParameters()


    } catch (error) {
        return NextResponse.json({ error: "FAailed to generate authentication parameters for imagekit" }, { status: 500 });

    }
}