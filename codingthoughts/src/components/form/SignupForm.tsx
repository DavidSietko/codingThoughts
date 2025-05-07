import { useState } from "react";
import styles from "./LoginForm.module.css";
import PasswordEntry from "./PasswordEntry";

export default function SignupForm() {
    // useState for the email and username
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const signupUser = () => {

    }

    return (
        <form className={styles.container}>
            <header className={styles.title}>Create Account</header>
            <div className={styles.entries}>
                <input type="text" className={styles.input} onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter a username"></input>
                <input type="text" className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"></input>
                <PasswordEntry placeholder="Enter Password"/>
                <button type="submit" className={styles.button} onClick={signupUser}>Sign Up</button>
            </div>
        </form>
    );

}