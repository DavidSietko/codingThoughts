import { useState } from "react";
import styles from "./LoginForm.module.css";
import PasswordEntry from "./PasswordEntry";


export default function LoginForm() {
    // useState for the email
    const [email, setEmail] = useState<string>("");

    const loginUser = () => {
        // will put logic to validate a user log in here
    }

    return (
        <form className={styles.container}>
            <header className={styles.title}>Log in Here</header>
            <div className={styles.entries}>
                <input type="text" className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email or username"></input>
                <PasswordEntry placeholder="Enter Password"/>
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