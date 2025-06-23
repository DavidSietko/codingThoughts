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
    // check if not expired
    if(token.expiresAt < new Date()) {
        return NextResponse.json({ message: "This link has expired. Please save your email again to request a new link."}, { status: 400 });
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
    // check token type
    if(token.type != "EMAIL_CHANGE") {
        // password change token, change the password and return
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { password: token.value }
            });
        } catch (error) {
            console.log("Failed to update user password", error);
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
        return NextResponse.json({ message: "Password changed successfully, you may log in to your account now."});
    }
    else {
        // email change token, change the email
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { email: token.value }
            });
        } catch (error) {
            console.log("Failed to update user email", error);
            return NextResponse.json({ message: errorMessage }, { status: 500 });
        }
        // otherwise all good
        return NextResponse.json({ message: "Email changed successfully. You may return to your old window and see your updated account details. Please wait up to 5 seconds if your email has not changed."});
    }
}