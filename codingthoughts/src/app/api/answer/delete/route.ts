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

    const data = await req.json()
    const id: number = data.id;

    if (!id) {
        throw new Error("Invalid id");
    }

    const answer = await prisma.answer.findUnique({
        where: { id },
    });

    if (!answer || answer.userId !== userId) {
        throw new Error("Not authorized or answer does not exist");
    }

    await prisma.answer.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Successfully deleted answer" });
}