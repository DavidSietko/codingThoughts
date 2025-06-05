import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    // get cookies to see if the user has logged in yet
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;
    if (!userId) {
        throw new Error("Not logged in yet");
    }

    console.log("getting request lallala");
    const {username} = await req.json();

    // Check if username is unique
    const existingUsername = await prisma.user.findUnique({
        where: {username: username}
    });

    if(existingUsername && existingUsername.id === userId) {
        return NextResponse.json({ message: "Same username" });
    }

    if(existingUsername) {
        return NextResponse.json({ message: "This username is already taken. Please choose a different username" }, { status: 400 });
    }

    // check if username provided
    if(!username) {
        return NextResponse.json({ message: "No username. "}, { status: 400 });
    }

    // update the username
    await prisma.user.update({
        where: {
            id: userId
        }, 
        data: {
            username: username
        }
    });

    //return good response
    return NextResponse.json({ message: "Username changed successfully" });
}