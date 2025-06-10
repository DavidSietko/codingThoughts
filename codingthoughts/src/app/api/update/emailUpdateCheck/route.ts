import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    const {email} = await req.json();
    if(!email) {
        return NextResponse.json({ message: "No email provided" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user) {
        return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    if(user.email.toLocaleLowerCase() === email.toLocaleLowerCase()) {
        return NextResponse.json({ message: "Email not updated yet", status: false});
    }
    return NextResponse.json({message: "Email updated successfully", status: true, email: email});
}