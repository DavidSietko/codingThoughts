import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prismaClient/prismaClient';
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
    // Get username, email and password using desctructuring
    console.log("Trying to sign the user up !2121212");
    const data = await req.json();

    // Check if the email is unique
    const existingEmail = await prisma.user.findUnique({
        where: {email: data.email}
    });

    if(existingEmail) {
        return NextResponse.json({ message: "A user with this email already exists. Please use a different email" }, { status: 400 });
    }

    // Check if username is unique
    const existingUsername = await prisma.user.findUnique({
        where: {username: data.username}
    });

    if(existingUsername) {
        return NextResponse.json({ message: "This username is already taken. Please choose a different username" }, { status: 400 });
    }
    // Hash the password for encryption
    const hashedPassword: string = await bcrypt.hash(data.password, 10);

    // Create the new user
    await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
        }
    });
    // Return clean response
    return NextResponse.json({ message: "User created successfully" });
}