import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    // Desctruct the request body to create a new answer for the user
    const {number, title, difficulty, language, description, explanation, code, videoLink} = await req.json();

    // create the answer
    await prisma.answer.create({
        data: {
            userId: userId,
            number: number,
            title: title,
            difficulty: difficulty,
            language: language,
            description: description,
            explanation: explanation,
            code: code,
            videoLink: videoLink,
        }
    });

    // return successful response
    return NextResponse.json({ message: "Answer created successfully" });
}