import { VerifyEmail } from "@/components/email/VerifyEmail";
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { ReactElement } from "react";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";
import { User } from "@prisma/client";
import { error } from "console";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        throw new Error("No user ID found");
    }

    // get the new email
    const data = await req.json();
    const newEmail: string = data.email;

    // check if valid
    if(!newEmail) {
        return NextResponse.json({ message: "Invalid Email Provided."},  { status: 400 });
    }

    // create a token for this email to validate it
    const token = await prisma.token.create({
        data: {
            userId: userId,
            value: newEmail,
            type: "EMAIL_CHANGE",
            expiresAt: new Date(Date.now() + 3600 * 1000),
        },
        include: {
            user: true
        }
    });

    // check if token created successfully
    if(!token) {
        return NextResponse.json({ message: "There was an error creating the token"}, { status: 500 });
    }

    // construct the url to verify the email
    const verifyUrl = `${process.env.BASE_URL}/verify-email?token=${token.id}`;

    try {
        const { data, error } = await resend.emails.send({
            from: 'mypuzzle12@smtp.greenweb.ie',
            to: [newEmail],
            subject: 'Email Change',
            react: VerifyEmail({ username: token.user.username, verifyUrl: verifyUrl}) as ReactElement,
        });

        if (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ mesasge: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const tokenId: string | null = url.searchParams.get("token");
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
    // otherwise all good
    return NextResponse.json({ message: "Email changed successfully. You can close the previous window now and "})
}