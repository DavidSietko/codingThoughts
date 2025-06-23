import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { Prisma } from "@prisma/client";
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
                mode: "insensitive",
            },
        }),
        ...(title && {
            title: {
            contains: title,
            mode: 'insensitive',
            },
        }),
        ...(difficulty && {
            difficulty: {
            contains: difficulty,
            mode: 'insensitive',
            },
        }),
        ...(language && {
            language: {
            equals: language,
            mode: 'insensitive',
            },
        }),
    };

    const answers = await prisma.answer.findMany({ where });

    return NextResponse.json(answers);
}