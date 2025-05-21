"use client";

import { checkAuth } from "@/app/lib/auth";
import { Answer } from "@/app/lib/types/Answer";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'next/navigation';
import styles from "./page.module.css";


export default function Home() {
    // useState for all needed values
    const [currentAnswer, setCurrentAnswer] = useState<Answer>();
    const [number, setNumber] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [notFound, setNotFound] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    // get the id of answer from the search params
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // get anser from params
    const params = useParams();

    useEffect(() => {
            const fetchAnswer = async() => {
                try {
                    await checkAuth();
                    const response = await fetch(`/api/answer/${params.answer}?id=${id}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if(!response.ok) {
                        throw new Error("NOT FOUND");
                    }
                    
                    const data = await response.json();
                    setCurrentAnswer(data);
                    setNumber(data.number);
                    setTitle(data.title);
                    setDifficulty(data.difficulty);
                    setLanguage(data.language);
                    setDescription(data.description);
                    setExplanation(data.explanation);
                    setLink(data.videoLink);
                    alert(data.videoLink);
                } catch(error: any) {
                    console.log(error.message);
                    setNotFound(true);
                }
            }
            fetchAnswer();
    }, []);

    const changeValue = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setValue(value);
        setChanged(true);
    }

    if(notFound) return <div>404 PAGE NOT FOUND</div>;

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.title}>
                    <header>{`${number}.  ${title}`}</header>
                    <div className={styles.link}>
                        <p>Video Solution:</p>
                        <a href={link}>{link}</a>
                    </div>
                </div>
                <div className={styles.text}>
                    <div className={styles.textEntry}>
                        <span>DESCRIPTION</span>
                        <textarea value={description} onChange={(e) => changeValue(e.target.value, setDescription)}></textarea>
                    </div>
                    <div className={styles.textEntry}>
                        <span>EXPLANATION</span>
                        <textarea value={explanation} onChange={(e) => changeValue(e.target.value, setExplanation)}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}