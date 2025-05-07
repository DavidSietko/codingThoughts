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
            <header className={styles.title}>Log in Here</header>
            <div className={styles.entries}>
                <input className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email or username"></input>
                <input className={styles.input} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter Password"></input>
                <button className={styles.button} onClick={loginUser}>Login</button>
            </div>
            <div className={styles.bottom}>
                <span>If a new user:</span>
                <div className={styles.linksContainer}>
                    <a className={styles.links}>Forgot Password?</a>
                    <a className={styles.links} href="/signup" rel="Sign up">Sign up</a>
                </div>
            </div>
        </form>
    );
}