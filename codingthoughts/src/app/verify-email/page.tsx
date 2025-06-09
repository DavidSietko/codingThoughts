"use client";
import ErrorMessage from "@/components/form/ErrorMessage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    // message to show user status after backend call
    const [message, setMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // get token id from the url
    const searchParams = useSearchParams();
    const token: string | null = searchParams.get("token");

    // useEffect to validate the link and see if need to update email
    useEffect(() => {
        const handler = async() => {
            try {

                console.log(`TOKEN: ${token}`);
                // check if token exists
                if(!token) {
                    throw new Error("Invalid Link. Re-send email and try again");
                }
                console.log(`TOKEN: ${token}`);
                // know token exists, make GET request to validate it
                const response = await fetch("/api/update/emailVerify", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({tokenId: token})
                });

                const data = await response.json();
                if(!response) {
                    throw new Error(data.message);
                }
                setLoading(false);
                setSuccess(true);
                setMessage(data.message);
            } catch(error: any) {
                setLoading(false);
                setMessage(error.message);
            }
        }
        handler();
    }, []);

    if(loading) {
        return (
            <header className={styles.container}>Changing email. Please wait...</header>
        );
    }
    else {
        return (
            <div className={styles.container}>
                {success ? <header>{message}</header> : <header className={styles.error}>{message}</header>}
            </div>
        );
    }
}