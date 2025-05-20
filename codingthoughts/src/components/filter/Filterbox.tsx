import { useEffect, useRef, useState } from "react";
import { Answer } from "@/app/lib/types/Answer";
import styles from "./Filterbox.module.css"
import DifficultyDropdown from "../dropdown/DifficultyDropdown";
import { fetchData } from "@/app/lib/answer/answer";
import PieChart from "../PieChart/PieChart";

interface Props {
    number: string;
    difficulty: string;
    language: string;
    setNumber: React.Dispatch<React.SetStateAction<string>>;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    answers: Answer[];
}

export default function Filterbox(props: Props) {
    // useRefs for all values needed for pie chart
    const [total, setTotal] = useState<number>(0);
    const [data, setData] = useState<number[]>([]);

    // useEffect to get total amount of answers a user has completed on 1st render
    useEffect(() => {
        const createChart = async() => {
            try {
                const data = await fetchData("", "", "", "");
                console.log("Logging Data...");
                console.log(data);
                setTotal(data.length);
                const easyCount: number = data.filter((answer: { difficulty: string }) => answer.difficulty === "Easy").length;
                const mediumCount: number = data.filter((answer: { difficulty: string }) => answer.difficulty === "Medium").length;
                const hardCount: number = data.filter((answer: { difficulty: string }) => answer.difficulty === "Hard").length;
                setData([easyCount, mediumCount, hardCount]);
            } catch(error: any) {
                console.log(error.message);
            }
        }

        createChart();
    }, [props.answers]);

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <div className={styles.entry}>
                    <p>Number:</p>
                    <input type="number" value={props.number} onChange={(e) => props.setNumber(e.target.value)}  placeholder="Enter Problem Number"></input>
                </div>
                <div className={styles.entry}>
                    <p>Language:</p>
                    <input type="text" value={props.language} onChange={(e) => props.setLanguage(e.target.value)} placeholder="Language used"></input>
                </div>
                <div className={styles.entry}>
                    <p>Difficulty:</p>
                    <DifficultyDropdown setDifficulty={props.setDifficulty} />
                </div>
            </div>
            <PieChart total={total} data={data} />
        </div>
    );
}