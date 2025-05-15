import { useState } from "react";
import styles from "./CreateForm.module.css";
import ErrorMessage from "./ErrorMessage";
import { checkAuth } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function CreateForm() {
    // useStates for all values for an answer
    const [number, setNumber] = useState<number | undefined>();
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const difficulties: string[] = ["easy", "medium", "hard"];

    // Create router to route back to create page upon creation of an answer
    const router = useRouter();

    const createAnswer = async() => {
        if(typeof number === undefined || !title.trim() || !difficulty.trim() || !language.trim() || !explanation.trim() || !code.trim()) {
            setErrorMessage("Make sure all non-optional entries are filled in!");
        }
        else {
            try {
                // check if user logged in
                await checkAuth();

                // make the post call to create the answer
                await fetch("/api/answer/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        number: number,
                        title: title.trim(),
                        difficulty: difficulty.trim(),
                        language: language.trim(),
                        description: description.trim(),
                        explanation: explanation.trim(),
                        code: code.trim(),
                        videoLink: link.trim()
                    })
                })
                // answer created successfully, go back to main page
                router.push("/main");

            } catch(error: any) {
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.main}>CREATE YOUR ANSWER HERE</header>
            <div className={styles.nameContainer}>
                <div className={styles.valueContainer}>
                    <div className={styles.entryContainer}>
                        <span>Problem Number</span>
                        <input type="number" value={number} onChange={(e) => setNumber(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="Problem Number..."></input>
                    </div>
                    <div className={styles.entryContainer}>
                        <span>Problem Name</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Problem name..."></input>
                    </div>
                </div>
                <div className={styles.valueContainer}>
                    <div className={styles.entryContainer}>
                        <span>Difficulty</span>
                        <select onChange={(e) => setDifficulty(e.target.value)}>
                        {difficulties.map((currentDifficulty, index) => (
                            <option key={index}>{currentDifficulty}</option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.entryContainer}>
                        <span>Language Used</span>
                        <input type="text" value={language} placeholder="Enter language used here" onChange={(e) => {setLanguage(e.target.value);}}></input>
                    </div>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <span>Enter problem description here (optional)</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={5}></textarea>
            </div>
            <div className={styles.detailsContainer}>
                <span>Enter problem explanation here</span>
                <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Explanation" rows={10}></textarea>
            </div>
            <div className={styles.detailsContainer}>
                <span>Enter your code here</span>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" rows={10}></textarea>
            </div>
            <div className={styles.linkContainer}>
                <span>Video link to solution (optional)</span>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Video Link"></input>
            </div>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            <button onClick={createAnswer}>CREATE</button>
        </div>
    );
}