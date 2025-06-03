import { useState } from "react";
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
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function LanguageDropdown(props: Props) {

    return (
        <select className={styles.container} onChange={(e) => props.setLanguage(e.target.value)}>
            {languageOptions.map((language) => (
                 <option key={language.value} value={language.value}>{language.label}</option>
            ))}
        </select>
    );
}