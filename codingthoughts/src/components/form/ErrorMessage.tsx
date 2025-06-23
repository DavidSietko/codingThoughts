import { useEffect } from "react";
import styles from "./LoginForm.module.css"

interface Props {
    errorMessage: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function ErrorMessage({ errorMessage, setErrorMessage }: Props) {
    // useEffect hook to re-render to display the errorMessage
    useEffect((() => {
        setTimeout(() => {
            setErrorMessage("");
        }, 4000);
    }), [errorMessage, setErrorMessage]);

    return(
    <p className={styles.error}>{errorMessage}</p>
    );
}