import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prismaClient/prismaClient';
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function GET() {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    // rget unique user data
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            username: true,
            email: true
        }
    });

    // see if user found
    if(!user) {
        return NextResponse.json({ message: "User not found." }, { status: 400 });
    }

    return NextResponse.json(user);
}