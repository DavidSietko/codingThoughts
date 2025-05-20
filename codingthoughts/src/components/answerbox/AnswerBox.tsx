import { Answer } from "@/app/lib/types/Answer";
import styles from "./AnswerBox.module.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { title } from "process";
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

    const deleteAnswer = () => {
        setIndex(null);
        setCurrentId(null);
    }

    // create a useEffect which will update the answers on screen
    useEffect(() => {

      // create async function to update answers array
      (async () => {
      try {
        const data = await fetchData(props.number, props.title, props.difficulty, props.language);
        props.setAnswers(data);
      } catch (error: any) {
        alert(error.message);
      }
      })();

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
                        <button>GO</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}