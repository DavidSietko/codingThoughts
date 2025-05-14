import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prismaClient/prismaClient';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const {email, password } = await req.json();

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: email }
            ],
        },
    });

    // check if the user can be found
    if(!user) {
        return NextResponse.json({ message: "User not found. Check email or username spelling."}, { status: 400});
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

export async function GET() {
    const userCookies = await cookies();
    const userId = userCookies.get("userId")?.value;

    // check if cookie exists
    if(!userId) {
        return NextResponse.json({ message: "No ID found. User not logged in yet." }, { status: 401 });
    }

    // Check if the userId that was retrieved is a valid ID
    const user = prisma.user.findUnique({
        where: { id: userId }
    });

    if(!user) {
        return NextResponse.json({ message: "Invalid ID." }, { status: 401 });
    }

    // Else valid id found. User is logged in
    return NextResponse.json({ message: "Valid ID. User is logged in." });
}