import { VerifyEmail } from "@/components/email/VerifyEmail";
import createResendClient from "@/app/lib/resendClient";
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { ReactElement } from "react";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";
import { User } from "@prisma/client";

export async function POST(req: Request) {
    const resend = createResendClient();
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
        return NextResponse.json({ message: "No Email Provided. Please provide an email."},  { status: 400 });
    }

    // check if somebody uses this email
    const exists: User | null = await prisma.user.findUnique({
        where: {
            email: newEmail
        }
    });

    if(exists) {
        return NextResponse.json({ message: "An account with this email exists. Please enter a different email"}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    // check if token matches a user
    if(!user) {
        return NextResponse.json({ message: "Invalid token, account doesnt exist."}, { status: 400 });
    }

    // check if emails are different for this user
    if(user.email === newEmail) {
        return NextResponse.json({ message: "Please enter a new email" }, { status: 400 });
    }

    // create a token for this email to validate it
    const token = await prisma.token.create({
        data: {
            userId: userId,
            value: newEmail,
            type: "EMAIL_CHANGE",
            expiresAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
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
            from: 'CodingThoughts@smtp.greenweb.ie',
            to: [newEmail],
            subject: 'Email Change',
            react: VerifyEmail({ username: token.user.username, verifyUrl: verifyUrl}) as ReactElement,
        });

        if (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log(error.message);   
        }
        return NextResponse.json({ mesasge: error instanceof Error ? error.message : "There was an error sending you an email" }, { status: 500 });
    }
}