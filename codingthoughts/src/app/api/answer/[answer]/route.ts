import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from "@/app/lib/prismaClient/prismaClient";
import { getUserIdFromToken } from '@/app/lib/get_cookie/auth';

export async function GET(request: NextRequest) {
  try {
      // get userId from cookie
      const userId = await getUserIdFromToken();
      if (!userId) throw new Error("No user ID found");

      // Get the dynamic route parameter from the URL path
      const answer = request.nextUrl.pathname.split('/').pop();
      
      // Get the query parameter
      const id = request.nextUrl.searchParams.get('id');

      if (!answer || !id) {
        return NextResponse.json({ message: "Missing parameters" },{ status: 400 });
      }

      const answerObject = await prisma.answer.findUnique({
        where: { 
            id: parseInt(id), 
            userId: userId, 
            title: answer
          },
        }
      );

    // check if answer retrieved successfully
    if (!answerObject) return NextResponse.json({ message: "Answer doesn't exist" }, { status: 400 });

    return NextResponse.json(answerObject);
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error);
    }
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
}