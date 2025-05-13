import { useState } from "react";
import styles from "./LoginForm.module.css";
import PasswordEntry from "./PasswordEntry";
import { Router, useRouter } from "next/router";
import { handleLogin } from "@/app/lib/auth";
import ErrorMessage from "./ErrorMessage";


export default function LoginForm() {
    // useState for the email, password and errorMessage
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email || !password) {
            setErrorMessage("Make sure all entries are filled in!")
        }
        else {
            try {
                const data = await handleLogin(email, password);
            } catch (error: any) {
                // Show user-friendly error
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <form className={styles.container}>
            <header className={styles.title}>Log in Here</header>
            <div className={styles.entries}>
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                <input type="text" value={email} className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email or username"></input>
                <PasswordEntry password={password} setPassword={setPassword} placeholder="Enter Password"/>
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