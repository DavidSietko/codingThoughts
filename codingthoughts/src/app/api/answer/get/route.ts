import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { Answer, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
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