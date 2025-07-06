import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm"
import ImageKit from "imagekit";
import { v4 as uuidv4 } from "uuid";
import { user } from "@heroui/theme";

// imagekit credential
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENPOINT || ""
});
// endpoint check
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" },
                { status: 401 }
            )
        }
        //parse form data
        const formData = await request.formData()
        const file = formData.get("file") as File
        const formUserId = formData.get("userId") as string
        const parentId = formData.get("parentId") as string || null


        // match userID
        if (formUserId !== userId) {
            return NextResponse.json({ error: "Unauthorized" },
                { status: 401 });
        }

        if (!file) {
            return NextResponse.json(
                {
                    error: "NO file provided"
                },
                { status: 401 }
            )
        }
        if (parentId) {
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, userId),
                        eq(files.isFolder, true)
                    )
                )
        }
        if (!parentId) {
            return NextResponse.json(
                { error: "Parent Folder not found" },
                { status: 400 }
            );

        }
        if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
            return NextResponse.json({ error: "Only images and pdf are supported" },
                { status: 401 }
            );
        }
        const buffer = await file.arrayBuffer()
        const fileBuffer = Buffer.from(buffer)

        const folderPath = parentId ? `/droply/${userId}/folder/${parentId}` : `/droply/${userId}`
        const originalFilename = file.name
        //check for empty extension
        const fileExtension = originalFilename.split(".").pop() || ""
        //validation for not storing exe, php
        const uniqueFilename = `${uuidv4()}.${fileExtension}`

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: uniqueFilename,
            folder: folderPath,
            useUniqueFileName: false
        })

        const fileData = {
            name: originalFilename,
            path: uploadResponse.filePath,
            size: file.size,
            type: file.type,
            fileUrl: uploadResponse.url,
            thumbnailUrl: uploadResponse.thumbnailUrl || null,
            userId: userId,
            parentId: parentId,
            isFolder: false,
            isStarred: false,
            isTrash: false,



        };
        const [newFile] = await db.insert(files).values(fileData).returning()
        return NextResponse.json(
            newFile
        );
    }

    catch (error) {
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });

    }

}
