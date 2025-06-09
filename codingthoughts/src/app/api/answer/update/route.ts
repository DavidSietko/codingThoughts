import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    // get id of answer to update it
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) {
        return NextResponse.json({message: "No answer id found"}, { status: 400 });
    }

    // get rest of answer attributes
    const {number, title, difficulty, language, description, explanation, code, videoLink} = await req.json();

    // update the answer
    await prisma.answer.update({
        where: {
            id: parseInt(id),
            userId: userId
        },
        data : {
            title: title,
            number: number,
            difficulty: difficulty,
            language: language,
            description: description,
            explanation: explanation,
            code: code,
            videoLink: videoLink
        }
    });

    return NextResponse.json({ message: "Update successful"});
}