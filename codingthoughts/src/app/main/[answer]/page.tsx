"use client";

import { checkAuth } from "@/app/lib/auth";
import { Answer } from "@/app/lib/types/Answer";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'next/navigation';
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import CodeWindow from "@/components/CodeWindow/CodeWindow";
import ErrorMessage from "@/components/form/ErrorMessage";
import isValidUrl from "@/app/lib/link/videoLink";


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
    const [updated, setUpdated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isInitializing, setIsInitializing] = useState<boolean>(true);

    const router = useRouter();

    // get the id of answer from the search params
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // get answer from params
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
                    setCode(data.code);
                    setLink(data.videoLink !== null ? data.videoLink : "");
                    setTimeout(() => {
                        setIsInitializing(false);
                    }, 2000);
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

        if(!changed) {
            setChanged(true);
        }
    }

    useEffect(() => {
        if(!isInitializing) {
            setUpdated(true);
        }
    }, [number, title, language, difficulty, description, explanation, code, link]);

    const saveAnswer = async() => {
        try {
            await checkAuth();
            const response = await fetch(`/api/answer/update?id=${id}`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number: number,
                    title: title,
                    difficulty: difficulty,
                    language: language,
                    description: description,
                    explanation: explanation,
                    code: code,
                    videoLink: link
                })
            });
            const data = await response.json();

            if(!response.ok) {
                alert("Problemo");
                throw new Error(data.message);
            }
            router.push("/main");
        } catch(error: any) {
            setErrorMessage(error.message);
        }
    }

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [linkErrorMessage, setLinkErrorMessage] = useState<string>("");

    const saveLink = () => {
        if(!isEditing) {
            setIsEditing(true);
        }
        else {
            if(isValidUrl(link)) {
                setIsEditing(false);
            }
            else {
                setLinkErrorMessage("Invalid Link. Please provide valink link starting with https://");
            }
        }

    }

    if(notFound) return <div>404 PAGE NOT FOUND</div>;

    <a href={link}>{link}</a>
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.title}>
                    <header>{`${number}.  ${title}`}</header>
                    <div className={styles.linkContainer}>
                        <div className={styles.link}>
                            <p>Video Solution:</p>
                            {isEditing ? <input className={styles.linkInput} type="text" value={link} onChange={(e) => setLink(e.target.value)}></input> 
                            : <a href={link}>{link}</a>}
                            <button className={styles.linkButton} onClick={saveLink}>{isEditing ? "Save" : "Edit Link"}</button>
                            {isEditing && <button className={styles.linkButton} onClick={() => setIsEditing(false)}>Cancel</button>}
                        </div>
                        <ErrorMessage errorMessage={linkErrorMessage} setErrorMessage={setLinkErrorMessage} />
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
                {updated && 
                    <div className={styles.buttonContainer}>
                        <button className={styles.saveButton} onClick={saveAnswer}>SAVE</button>
                        <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                    </div>
                }
            </div>
            <CodeWindow language={language} setLanguage={setLanguage} code={code} setCode={setCode} setIsInitializing={setIsInitializing} />
        </div>
    );
}