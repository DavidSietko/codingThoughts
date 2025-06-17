"use client";

import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";
import isValidEmail, { handleLogout } from "@/app/lib/auth";
import styles from "./PasswordChangeForm.module.css";

export default function PasswordChangeForm() {
    // useState for the error message and email
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // router to re-route user
    const router = useRouter();

    const updatePassword = async(e: React.FormEvent) => {
        // stop form page reload
        e.preventDefault();
        try {
            if(!email.trim()) {
                throw new Error("Please enter an email");
            }
            // check if valid email
            if(!isValidEmail(email.trim())) {
                throw new Error("Please enter a valid email in the form example@example.com");
            }
            if(!password.trim()) {
                throw new Error("Please enter in a password");
            }
            // get response of sending email email
            const response =  await fetch("/api/update/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            // get data from the response
            const data = await response.json();
            // check if response ok
            if(!response.ok) {
                throw new Error(data.message);
            }
            // if ok response, redirect to homepage
            await handleLogout();
            router.push("/login");
        } catch(error: any) {
            setErrorMessage(error.message);
        }

    }
    return (
        <form className={styles.container}>
            <div className={styles.text}>
                <p>Enter the email associated with your account</p>
                <p>A verification link will be sent to this email which you need to click to verify your password change</p>
                <p>Upon a successfull email send, you will be logged out and sent to the home page</p>
            </div>
            <div className={styles.inputs}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email here..."></input>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a new password here..."></input>
            </div>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            <button onClick={updatePassword}>SEND</button>
        </form>
    );
}