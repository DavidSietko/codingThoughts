import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prismaClient/prismaClient';
import { ReactElement } from "react";
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import createResendClient from '@/app/lib/resendClient';
import { PasswordChangeEmail } from '@/components/email/PasswordChangeEmail';

export async function POST(req: Request) {
    const resend = createResendClient();
    // get the email to send new password to
    const {email, password} = await req.json();

    // hash password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // see if got email
    if(!email) {
        return NextResponse.json({ message: "There was an error fetching your email. Please try again"}, {status: 400});
    }
    // get user for this email
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    // check if user exists
    if(!user) {
        return NextResponse.json({ message: "There is no account associated with this email. Make sure you entered correct email"}, {status: 400});
    }
    // create a token for this email to validate it
    const token = await prisma.token.create({
        data: {
            userId: user.id,
            value: hashedPassword,
            type: "PASSWORD_RESET",
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

    // send the verification email
    try {
        const {error} = await resend.emails.send({
            from: `CodingThoughts@smtp.greenweb.ie`,
            to: [email],
            subject: 'Password Reset',
            react: PasswordChangeEmail({ verifyUrl: verifyUrl}) as ReactElement,
        });
        // check for error sending email
        if (error) {
            console.error(error);
            return NextResponse.json({ message: "Email failed to send. Please try again later." }, { status: 500 });
        }
        // success
        return NextResponse.json({ message: "Password change successfull"});
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log(error.message);
        }
        return NextResponse.json({ mesasge: error instanceof Error ? error.message : "There was an error sending the email. Please try again" }, { status: 500 });
    }
}