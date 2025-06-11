import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }
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
    return NextResponse.json({ message: "Username changed successfully", username: username});
}