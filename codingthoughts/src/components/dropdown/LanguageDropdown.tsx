import { useEffect, useState } from "react";
import styles from "./LanguageDropdown.module.css";

export const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Rust", value: "rust" },
];

interface Props {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setIsInitializing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LanguageDropdown(props: Props) {

    useEffect(() => {
        for(let l of languageOptions) {
            if(l.label.toLocaleLowerCase() === props.language.toLocaleLowerCase()) {
                props.setIsInitializing(true);
                props.setLanguage(l.value);
            }
        }
    }, [props.language]);

    return (
        <select className={styles.container} value={props.language} onChange={(e) => props.setLanguage(e.target.value)}>
            {languageOptions.map((language) => (
                 <option key={language.value} value={language.value}>{language.label}</option>
            ))}
        </select>
    );
}