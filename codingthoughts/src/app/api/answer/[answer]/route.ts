import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function GET(req: Request, { params }: { params: { answer: string } }) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    // get the answer title and id from the url
    const title: string = params.answer;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // check if the title or id are valid
    if(!title || !id) {
        return NextResponse.json({ message: "Invalid Parameters."}, { status: 400 });
    }


    // get the answer from the database
    const answer = await prisma.answer.findUnique({
        where: {
            id: parseInt(id),
            userId: userId,
            title: title,
        }
    });

    if(!answer) {
        return NextResponse.json({ message: "Answer doesnt exist"}, { status: 400 });
    }

    // return the answer
    return NextResponse.json(answer);
}