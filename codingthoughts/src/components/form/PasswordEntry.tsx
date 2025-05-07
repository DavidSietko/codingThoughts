import { useState } from "react";
import styles from "./LoginForm.module.css";
import Image from 'next/image';

interface Props {
    placeholder: string
}

export default function PasswordEntry(props: Props) {
    // useState for password
    const [password, setPassword] = useState<string>("");

    // useState for revealing or hiding password
    const [reveal, setReveal] = useState<boolean>(false);
    
    return (
        <div className={styles.passwordEntry}>
            <input type={reveal ? "text" : "password"} className={styles.input} onChange={(e) => {setPassword(e.target.value)}} placeholder={props.placeholder}></input>
            <Image className={styles.icon} onClick={() => setReveal(!reveal)} src={reveal ? "/eye/eye-show.svg" : "eye/eye-hide.svg" } width={25} height={25} alt="EYE"/>
        </div>
    );
}