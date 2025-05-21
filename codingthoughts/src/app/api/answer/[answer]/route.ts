import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { answerName: string } }) {
    // get cookies to see if the user has logged in yet
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;
    if (!userId) {
        throw new Error("Not logged in yet");
    }
    const {answerName} = params;

    const answer = prisma.answer.findUnique({
        where: {
            userId: userId,
            title: answerName,
        }
    })
}