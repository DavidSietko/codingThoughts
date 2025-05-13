import { useState } from "react";
import styles from "./LoginForm.module.css";
import Image from 'next/image';

interface Props {
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    placeholder: string
}

export default function PasswordEntry(props: Props) {
    // useState for revealing or hiding password
    const [reveal, setReveal] = useState<boolean>(false);

    //function to change the password
    const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        props.setPassword(e.target.value);
    }
    
    return (
        <div className={styles.passwordEntry}>
            <input type={reveal ? "text" : "password"} className={styles.input} value={props.password} onChange={handlePasswordChange} placeholder={props.placeholder}></input>
            <Image className={styles.icon} onClick={() => setReveal(!reveal)} src={reveal ? "/eye/eye-show.svg" : "eye/eye-hide.svg" } width={25} height={25} alt="EYE"/>
        </div>
    );
}