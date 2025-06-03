"use client";
import Editor from '@monaco-editor/react';
import styles from "./CodeWindow.module.css";
import LanguageDropdown from '../dropdown/LanguageDropdown';
import { useState } from 'react';
import dropdownStyles from "../dropdown/LanguageDropdown.module.css";

const themes = [
    {label: "vscode light", value: "vs"},
    {label: "vscode dark", value: "vs-dark"},
    {label: "high contrast dark", value: "hc-black"}
]

interface Props {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function CodeWindow(props: Props) {
    const [currentTheme, setCurrentTheme] = useState<string>("vs");

    const updateCode = (e: string | undefined) => {
        if(e != null) {
            props.setCode(e);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <LanguageDropdown setLanguage={props.setLanguage}/>
                <select className={dropdownStyles.container} onChange={(e) => setCurrentTheme(e.target.value)}>
                    {themes.map((theme) => (
                        <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                </select>
            </div>
            <div className={styles.editorContainer}>
            <Editor value={props.code} onChange={(e) => updateCode(e)} language={props.language} theme={currentTheme}/>
            </div>
        </div>
    );
}