import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // get cookies to see if the user has logged in yet
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;
    if (!userId) {
        throw new Error("Not logged in yet");
    }

    // Desctruct the request body to create a new answer for the user
    const {number, title, difficulty, language, description, explanation, code, link} = await req.json();

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
            videoLink: link
        }
    });

    // return successful response
    return NextResponse.json({ message: "Answer created successfully" });
}