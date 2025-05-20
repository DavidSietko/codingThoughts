import { useEffect } from "react";
import styles from "./Filterbox.module.css"
import DifficultyDropdown from "../dropdown/DifficultyDropdown";

interface Props {
    number: string;
    difficulty: string;
    language: string;
    setNumber: React.Dispatch<React.SetStateAction<string>>;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filterbox(props: Props) {

    // useEffect to get total amount of answers a user has completed on 1st render

    useEffect(() => {

    }, []);

    return (
        <div className={styles.container}>
            <input type="number" value={props.number} onChange={(e) => props.setNumber(e.target.value)}  placeholder="Enter Problem Number"></input>
            <input type="text" value={props.language} onChange={(e) => props.setLanguage(e.target.value)} placeholder="Language used"></input>
            <DifficultyDropdown setDifficulty={props.setDifficulty} />
        </div>
    );
}