"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./LoginForm.module.css";

export default function loginForm() {
    // strings for the email and password
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    // function to go to signup page, just pushing the signup route onto router
    const signupUser = () => {
        router.push("/signup");
    }

    const loginUser = () => {
        // will put logic to validate a user log in here
    }



    return (
        <form className={styles.container}>
            <div className={styles.title}>
                <header>Sign Up Here</header>
            </div>
            <div className={styles.entries}>
                <input onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email or username"></input>
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter Password"></input>
            </div>
            <div className={styles.buttons}>
                <button onClick={loginUser}>Login</button>
                <button onClick={signupUser}>Sign up</button>
            </div>
        </form>
    );
}