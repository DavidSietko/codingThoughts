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