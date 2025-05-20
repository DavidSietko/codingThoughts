import { Answer } from "@/app/lib/types/Answer";
import styles from "./AnswerBox.module.css";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
}

export default function AnswerBox(props: Props) {
    // useStates for currently pressed answer and the answer id used for deletion
    const [selectedIndex, setIndex] = useState<number | null>(null);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);

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


    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input className={styles.searchbar} type="text" value={props.name} onChange={(e) => { props.setName(e.target.value)}} placeholder="Enter a name here..."></input>
                <button onClick={() => {router.push("/main/create")}}>CREATE</button>
                {currentId && <button onClick={deleteAnswer}>DELETE</button>}
            </div>
            <ul className={styles.listContainer}>
                {answers.map((answer, index) => (
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