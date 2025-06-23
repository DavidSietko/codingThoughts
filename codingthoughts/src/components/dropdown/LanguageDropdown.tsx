import { useEffect } from "react";
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
    checkLabel: boolean;
}

export default function LanguageDropdown({ language, setLanguage, checkLabel }: Props) {

    useEffect(() => {
        if(!checkLabel) {
            for(const l of languageOptions) {
                if(l.label === language) {
                    setLanguage(l.value);
                }
            }
        }
    }, [language]);

    if(checkLabel) {
        return (
            <select className={styles.container} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value={""}>Select a Language</option>
                {languageOptions.map((language) => (
                    <option key={language.label} value={language.label}>{language.label}</option>
                ))}
            </select>
        );
    }
    else {
        return (
            <select className={styles.container} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value={""}>Select a Language</option>
                    {languageOptions.map((language) => (
                 <option key={language.value} value={language.value}>{language.label}</option>
                ))}
            </select>
        );
    }
}