import { useEffect } from "react";
import styles from "./LoginForm.module.css"

interface Props {
    errorMessage: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function ErrorMessage(props: Props) {
    // useEffect hook to re-render to display the errorMessage
    useEffect((() => {
        setTimeout(() => {
            props.setErrorMessage("");
        }, 7000);
    }), [props.errorMessage]);

    return(
    <p className={styles.error}>{props.errorMessage}</p>
    );
}