import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prismaClient/prismaClient';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const {email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email: email },
        include: { answers: true }
    })

    // check if the user can be found
    if(!user) {
        return NextResponse.json({ message: "User not found. Check Email spelling"}, { status: 400});
    }

    // check if the password is valid
    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
        return NextResponse.json({ message: "Invalid Password! Check if password is correct."}, { status: 401 });
    }

    // Create the response
    const response = NextResponse.json({ message: "Logged in successfully!" });

    // create a cookie with the userId to be used to retrieve answers
    // specific to this user, and return this response
    response.cookies.set("userId", user.id, {
        httpOnly: true,
        path: "/"
    });

    return response;
}