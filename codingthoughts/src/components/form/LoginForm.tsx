import { useState } from "react";
import styles from "./LoginForm.module.css";
import PasswordEntry from "./PasswordEntry";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/auth";
import ErrorMessage from "./ErrorMessage";
import isValidEmail from "@/app/lib/auth";


export default function LoginForm() {
    // useState for the email, password and errorMessage
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Create a router to re-route user to main page after login
    const router = useRouter();

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email.trim() || !password.trim()) {
            setErrorMessage("Make sure all entries are filled in!")
        }
        else {
            try {
                // check if valid email
                if(!isValidEmail(email.trim())) {
                    throw new Error("Please enter a valid email in the form example@example.com");
                }
                const data = await handleLogin(email, password);
                router.push("/main");
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
                    <a className={styles.links} href="/password-change">Forgot Password?</a>
                    <a className={styles.links} href="/signup" rel="Sign up">Sign up</a>
                </div>
            </div>
        </form>
    );
}