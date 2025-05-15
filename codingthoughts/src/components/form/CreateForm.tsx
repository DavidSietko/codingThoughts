import { useState } from "react";
import styles from "./CreateForm.module.css";

export default function CreateForm() {
    // useStates for all values for an answer
    const [number, setNumber] = useState<number>();
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");

    const difficulties: string[] = ["easy", "medium", "hard"];


    return (
        <div className={styles.container}>
            <header>CREATE YOUR ANSWER HERE</header>
            <div>
                <div>
                    <input type="number" value={number} onChange={(e) => setNumber(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="Problem Number..."></input>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Problem name..."></input>
                </div>
                <div>
                    <select>
                        {difficulties.map((currentDifficulty, index) => (
                            <option key={index} onClick={() => {setDifficulty(currentDifficulty);}}>{currentDifficulty}</option>
                        ))}
                    </select>
                    <input type="text" value={language} placeholder="Enter language used here" onChange={(e) => {setLanguage(e.target.value);}}></input>
                </div>
            </div>
            <div>
                <span>Enter problem description here(optional)</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={5}></textarea>
            </div>
            <div>
                <span>Enter problem explanation here</span>
                <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Explanation" rows={10}></textarea>
            </div>
            <button>CREATE</button>
        </div>
    );
}