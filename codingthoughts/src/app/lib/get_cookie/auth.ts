import { cookies } from "next/headers";
import { jwtVerify } from 'jose';

export async function getUserIdFromToken(): Promise<string | null> {
    const userCookies = await cookies();
    const token  = userCookies.get("auth_token")?.value;

    // see if token exists
    if(!token) {
        return null;
    }

    // try fetch the userId from the JSON token
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        if(!payload) {
            throw new Error("No user ID found.");
        }
        return payload.userId as string;
    } catch(error) {
        return null;
    }
}