"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Filterbox from "@/components/filter/Filterbox";
import AnswerBox from "@/components/answerbox/AnswerBox";
import { useRouter } from "next/navigation";
import { checkAuth } from "../lib/auth";
import { Answer } from "../lib/types/Answer";

export default function Home() {
    // useStates for all values needed
    const [number, setNumber] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [answers, setAnswers] = useState<Answer[]>([]);

    // Router to route user back to login page if login check unsuccessful
    const router = useRouter();

    // useEffect on initial render to check if the user is logged in
    useEffect(() => {
        const verifyAuth = async() => {
            try {
                await checkAuth();
            } catch(error: unknown) {
                if(error instanceof Error) {
                    console.log(error);
                }
                router.push("/login");
            }
        }
        verifyAuth();
    }, [router]);

    return(
        <div className={styles.container}>
            <Filterbox number={number} difficulty={difficulty} language={language} setNumber={setNumber} setDifficulty={setDifficulty} setLanguage={setLanguage} answers={answers}/>
            <AnswerBox number={number} title={title} difficulty={difficulty} language={language} answers={answers} setAnswers={setAnswers} setTitle={setTitle}/>
        </div>
    );
}