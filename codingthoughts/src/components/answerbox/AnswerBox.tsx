"use-client";

import { Answer } from "@/app/lib/types/Answer";
import styles from "./AnswerBox.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "@/app/lib/answer/answer";

interface Props {
    number: string;
    title: string;
    difficulty: string;
    language: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

export default function AnswerBox(props: Props) {
    // useStates for currently pressed answer and the answer id used for deletion
    const [selectedIndex, setIndex] = useState<number | null>(null);
    const [currentId, setCurrentId] = useState<number | null>(null);

    // router to change route
    const router = useRouter();

    const setSelectedIndex = (i: number) => {
        if(selectedIndex === i) {
            setIndex(null);
            setCurrentId(null);
        }
        else {
            setIndex(i);
        }
    }

    const deleteAnswer = async() => {
        try {
            if(selectedIndex !== null) {
                const id: number = props.answers[selectedIndex].id;
                const response = await fetch("/api/answer/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id})
                });

                if(!response.ok) {
                    throw new Error("Looks like you are not logged in. Please log in before continuing.");
                }

                const data = await response.json();

                console.log(data);
            }
            const data = await fetchData(props.number, props.title, props.difficulty, props.language);
            props.setAnswers(data);
            setIndex(null);
            setCurrentId(null);
        } catch(error: unknown) {
            if(error instanceof Error) {
                alert(error.message);
            }
        }
    }

    // create a useEffect which will update the answers on screen
    useEffect(() => {
        const debounce = setTimeout(() => {
            // create async function to update answers array
            (async () => {
                try {
                    const data = await fetchData(props.number, props.title, props.difficulty, props.language);
                    props.setAnswers(data);
                } catch (error: unknown) {
                    if(error instanceof Error) {
                        console.log(error.message);
                    }
                }
            })();
        }, 300);

        return () => {
            clearTimeout(debounce);
        }
    }, [props.number, props.title, props.difficulty, props.language]);


    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input className={styles.searchbar} type="text" value={props.title} onChange={(e) => { props.setTitle(e.target.value)}} placeholder="Enter a name here..."></input>
                <button onClick={() => {router.push("/main/create")}}>CREATE</button>
                {currentId && <button onClick={deleteAnswer}>DELETE</button>}
            </div>
            <ul className={styles.listContainer}>
                {props.answers.map((answer, index) => (
                    <li key={index} className={`${styles.answerContainer} ${selectedIndex === index ? styles.clicked : ""}`} onClick={() => {setCurrentId(answer.id); setSelectedIndex(index);}}>
                        <div className={styles.title}>
                            <p>{`${answer.number}.`}</p>
                            <p>{answer.title}</p>
                        </div>
                        <div className={styles.specs}>
                            <p>{`Difficulty: ${answer.difficulty}`}</p>
                            <p>{`Language: ${answer.language}`}</p>
                        </div>
                        <button onClick={() => {
                            router.push(`/main/${answer.title}?id=${answer.id}`);
                            setIndex(null);
                            setCurrentId(null);
                        }}>GO</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}