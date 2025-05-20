import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { Answer, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // get cookies to see if the user has logged in yet
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;
    if (!userId) {
        throw new Error("Not logged in yet");
    }

    // Get all different search parameters that can be searched with
    const {number, title, difficulty, language} = await req.json();

    const where: Prisma.AnswerWhereInput = {
        userId,
        ...(number && { 
            number: {
                contains: number,
                lte: "insensitive",
            },
        }),
        ...(title && {
            title: {
            contains: title,
            lte: 'insensitive',
            },
        }),
        ...(difficulty && {
            difficulty: {
            contains: difficulty,
            lte: 'insensitive',
            },
        }),
        ...(language && {
            language: {
            contains: language,
            lte: 'insensitive',
            },
        }),
    };

    const answers = await prisma.answer.findMany({ where });

    return NextResponse.json(answers);
}