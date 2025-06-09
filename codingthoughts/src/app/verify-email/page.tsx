"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    // useEffect to validate the link and see if need to update email
    useEffect(() => {
        const handler = async() => {
            try {
                // get token id from the url
                const searchParams = useSearchParams();
                const token: string | null = searchParams.get("token");

                if(!token) {
                    throw new Error("Token doesnt exist");
                }
            } catch(error: any) {

            }
        }
        handler();
    }, []);

    return (
        <div>
            PAGE EXISTS
        </div>
    );
}