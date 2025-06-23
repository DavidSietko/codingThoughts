import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
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