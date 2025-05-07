"use client";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import Image from 'next/image';


export default function loginForm() {
    // strings for the email and password
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    //useState for revealing or hiding password
    const [reveal, setReveal] = useState<boolean>(false);

    const loginUser = () => {
        // will put logic to validate a user log in here
    }

    return (
        <form className={styles.container}>
            <header className={styles.title}>Log in Here</header>
            <div className={styles.entries}>
                <input type="text" className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email or username"></input>
                <div className={styles.passwordEntry}>
                    <input type={reveal ? "text" : "password"} className={styles.input} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter Password"></input>
                    <Image className={styles.icon} onClick={() => setReveal(!reveal)} src={reveal ? "/eye/eye-show.svg" : "eye/eye-hide.svg" } width={25} height={25} alt="EYE"/>
                </div>
                <button type="submit" className={styles.button} onClick={loginUser}>Login</button>
            </div>
            <div className={styles.bottom}>
                <span>OR</span>
                <div className={styles.linksContainer}>
                    <a className={styles.links}>Forgot Password?</a>
                    <a className={styles.links} href="/signup" rel="Sign up">Sign up</a>
                </div>
            </div>
        </form>
    );
}