import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prismaClient/prismaClient';
import { cookies } from 'next/headers';

export async function GET() {
    // get cookies to see if the user has logged in yet
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;
    if (!userId) {
        throw new Error("Not logged in yet");
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