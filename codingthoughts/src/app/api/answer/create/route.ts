import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { Answer, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = await fetch("/api/cookie");
    const userId = await response.json();

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

export async function GET(req: Request) {
    // getting userId from cookie
    const response = await fetch("/api/cookie");
    const userId = await response.json();

    // Get all different search parameters that can be searched with
    const {number, title, difficulty, language} = await req.json();

    const where: Prisma.AnswerWhereInput = {};

    // Check if each of the parameters set
    if(number) {
        where.number = number;
    }

    if(title) {
        where.title = title;
    }

    if(difficulty) {
        where.difficulty = difficulty;
    }

    if(language) {
        where.language = language;
    }
}