"use client";
import Editor from '@monaco-editor/react';
import styles from "./CodeWindow.module.css";

interface Props {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function CodeWindow(props: Props) {

    const updateCode = (e: string | undefined) => {
        if(e != null) {
            props.setCode(e);
        }
    }

    return (
        <div className={styles.container}>
            <Editor value={props.code} onChange={(e) => updateCode(e)} defaultLanguage="javascript"/>
        </div>
    );
}