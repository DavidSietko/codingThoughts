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
    const [name, setName] = useState<string>("");
    const [answers, setAnswers] = useState<Answer[]>([]);

    // Router to route user back to login page if login check unsuccessful
    const router = useRouter();

    // useEffect on initial render to check if the user is logged in
    useEffect(() => {
        const verifyAuth = async() => {
            try {
                await checkAuth();
            } catch(error: any) {
                router.push("/login");
            }
        }
        verifyAuth();
    }, []);

    return(
        <div className={styles.container}>
            <Filterbox />
            <AnswerBox name={name} setName={setName}/>
        </div>
    );
}