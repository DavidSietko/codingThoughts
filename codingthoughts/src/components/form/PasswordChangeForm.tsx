"use client";

import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";

export default function PasswordChangeForm() {
    // useState for the error message and email
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    // router to re-route user
    const router = useRouter();

    const updatePassword = async() => {
        try {
            // get response of sending email email
            const response =  await fetch("/api/update/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });
            // get data from the response
            const data = await response.json();
            // check if response ok
            if(!response.ok) {
                throw new Error(data.message);
            }
            // if ok response, redirect to homepage
            router.push("/");
        } catch(error: any) {
            setErrorMessage(error.message);
        }

    }
    return (
        <form>
            <div>
                <p>Enter the email associated with your account</p>
                <p>A new password will be sent to this email which you can use to log into your account</p>
                <p>Upon a successfull email send, you will be logged out and sent to the home page</p>
            </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email here..."></input>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            <button onClick={updatePassword}>SEND</button>
        </form>
    );
}