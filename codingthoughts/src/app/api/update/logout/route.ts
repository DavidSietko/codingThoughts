import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    // get the token cookie
    const userCookies = await cookies();
    const token  = userCookies.get("auth_token");

    // if the cookie exists, delete it
    if(token) {
        userCookies.delete("auth_token");
    }
    // return clean response, no errors will happen here as all we do is delete cookie
    // and if not logged in we just want to go back to home page
    return NextResponse.json({ message: "Logout successfull" });
}