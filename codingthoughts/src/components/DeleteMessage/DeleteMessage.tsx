"use client";

import styles from "./DeleteMessage.module.css";

interface Props {
    deleteFunction: () => void;
    cancelFunction: () => void;
}

export default function DeleteMessage(props: Props) {

    return (
        <div className={styles.container}>
            <p>WARNING: Proceeding with this action will permanently delete your account along with all of your answers.
                 This action cannot be undone. Are you sure you want to proceed?</p>
            <div>
                <button onClick={props.deleteFunction} >OK</button>
                <button onClick={props.cancelFunction} >DELETE</button>
            </div>
        </div>
    );
}