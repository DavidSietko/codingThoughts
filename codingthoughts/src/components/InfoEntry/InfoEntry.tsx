"use client";

import { useState } from "react";
import styles from "./InfoEntry.module.css";

interface Props {
    entry: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    updateValue: () => void; 
}

export default function InfoEntry(props: Props) {
    const [readOnly, setReadOnly] = useState<boolean>(true);

    return (
        <div className={styles.container}>
            <p>{`${props.entry}:`}</p>
            <input type="text" readOnly={readOnly} value={props.value} onChange={(e) => props.setValue(e.target.value)}></input>
            {readOnly ? <button onClick={() => setReadOnly(false)}>{`Change ${props.entry}`}</button> : <button onClick={props.updateValue}>SAVE</button>}
            {!readOnly && <button onClick={() => setReadOnly(true)}>CANCEL</button>}
        </div>
    );
}