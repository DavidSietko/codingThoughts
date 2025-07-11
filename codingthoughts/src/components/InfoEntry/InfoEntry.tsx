"use client";

import { useState } from "react";
import styles from "./InfoEntry.module.css";

interface Props {
    entry: string;
    value: string;
    originalValue: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    updateValue: () => Promise<boolean>; 
}

export default function InfoEntry(props: Props) {
    const [readOnly, setReadOnly] = useState<boolean>(true);

    const checkSet = async() => {
        const set: boolean = await props.updateValue();

        if(set) {
            setReadOnly(true);
        }
        else {
            setReadOnly(false);
        }
    }

    return (
        <div className={styles.container}>
            <p>{`${props.entry}:`}</p>
            <input className={styles.input} type="text" readOnly={readOnly} value={props.value} onChange={(e) => props.setValue(e.target.value)}></input>
            {readOnly ? <button onClick={() => setReadOnly(false)}>{`Change ${props.entry}`}</button> : <button onClick={checkSet}>SAVE</button>}
            {!readOnly && <button onClick={() => {setReadOnly(true); props.setValue(props.originalValue);}}>CANCEL</button>}
        </div>
    );
}