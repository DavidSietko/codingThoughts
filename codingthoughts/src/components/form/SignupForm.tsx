import { useState, useEffect } from "react";
import styles from "./LoginForm.module.css";
import PasswordEntry from "./PasswordEntry";
import { handleSignup } from "@/app/lib/auth";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    // useState for the username, email, password and errorMessage and message display state
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // defining a router to change the route to login page
    const router = useRouter();

    const signupUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email.trim() || !username.trim() || !password.trim()) {
            setErrorMessage("Make sure all entries are filled in!")
        }
        else {
            try {
            const data = await handleSignup(username, email, password);
            router.push("/login");
            }
            catch(error: any) {
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <form className={styles.container}>
            <header className={styles.title}>Create Account</header>
            <div className={styles.entries}>
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                <input type="text" className={styles.input} onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter a username"></input>
                <input type="text" className={styles.input} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"></input>
                <PasswordEntry password={password} setPassword={setPassword} placeholder="Enter Password"/>
                <button type="submit" className={styles.button} onClick={signupUser}>Sign Up</button>
            </div>
        </form>
    );

}