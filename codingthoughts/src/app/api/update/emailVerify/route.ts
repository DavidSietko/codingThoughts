import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { User } from '@prisma/client';

export async function POST(req: Request) {
    const {tokenId} = await req.json();
    const errorMessage: string = "There was an error logging you in. Please send another email and try again.";
    // check if tokenId exists
    if(!tokenId) {
        console.log("Token property doesnt exist.");
        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
    // get token with existing id
    const token = await prisma.token.findUnique({
        where: {
            id: tokenId
        }
    });
    // Check if valid id
    if(!token) {
        console.log("Token doesnt exist. Invalid ID.");
        return NextResponse.json({ message: errorMessage}, { status: 400 });
    }
    // check token type
    if(token.type != "EMAIL_CHANGE") {
        console.log("Invalid token type");
        return NextResponse.json({ message: errorMessage}, { status: 400 });
    }
    // valid token, check if matches to a userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: token.userId
        }
    });
    // check if get a valid user
    if(!user) {
        console.log("User doesnt exist");
        return NextResponse.json({ message: "This account doesnt exist. Please make sure you havent deleted your account and have entered the correct details"}
            , { status: 400 }
        );
    }
    // valid user, change this users email to the new one
    try {
        await prisma.user.update({
            where: { id: user.id },
            data: { email: token.value }
        });
    } catch (error) {
        console.log("Failed to update user email", error);
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
    // delete all expired tokens
    await prisma.token.deleteMany({
        where: {
            expiresAt: {
            lt: new Date(), // Deletes tokens where expiry is in the past
            },
        },
    });
    // delete current token
    await prisma.token.delete({
        where: {
            id: tokenId
        }
    });
    // otherwise all good
    return NextResponse.json({ message: "Email changed successfully. You can close the previous window now and "})
}