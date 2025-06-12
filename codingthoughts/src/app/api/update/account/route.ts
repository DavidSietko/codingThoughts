import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/lib/get_cookie/auth";

export async function GET() {
    // try get userId from JSON token
    const userId = await getUserIdFromToken();
    if(!userId) {
        return NextResponse.json({message: "Looks like you are not logged in. Please log in before continuing with this action."}, {status: 400});
    }
    // try delete account and all answers
    try {
        await prisma.answer.deleteMany({
            where: {
                userId: userId
            }
        });
        
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
    } catch(error: any) {
        return NextResponse.json({ message: "There was an error with deleting your account"}, {status: 400});
    }
    // Clean response can return success
    return NextResponse.json({ message: "Account deleted successfully" });
}