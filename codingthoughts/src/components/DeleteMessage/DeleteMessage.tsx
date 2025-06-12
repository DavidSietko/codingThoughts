"use client";

import ErrorMessage from "../form/ErrorMessage";
import styles from "./DeleteMessage.module.css";

interface Props {
    deleteFunction: () => void;
    cancelFunction: () => void;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function DeleteMessage(props: Props) {

    return (
        <div className={styles.container}>
            <p>WARNING: Proceeding with this action will permanently delete your account along with all of your answers.
                 This action cannot be undone. Are you sure you want to proceed?</p>
            <div className={styles.buttons}>
                <button onClick={props.deleteFunction} >OK</button>
                <button className={styles.cancelButton} onClick={props.cancelFunction} >CANCEL</button>
            </div>
            <ErrorMessage errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} />
        </div>
    );
}