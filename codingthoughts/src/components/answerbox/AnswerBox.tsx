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

export default function AnswerBox({
  number,
  title,
  difficulty,
  language,
  setTitle,
  answers,
  setAnswers,
}: Props) {
  const [selectedIndex, setIndex] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const router = useRouter();

  const setSelectedIndex = (i: number) => {
    if (selectedIndex === i) {
      setIndex(null);
      setCurrentId(null);
    } else {
      setIndex(i);
    }
  };

  const deleteAnswer = async () => {
    try {
      if (selectedIndex !== null) {
        const id: number = answers[selectedIndex].id;
        const response = await fetch("/api/answer/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Looks like you are not logged in. Please log in before continuing.");
        }

        const data = await response.json();
        console.log(data);
      }

      const data = await fetchData(number, title, difficulty, language);
      setAnswers(data);
      setIndex(null);
      setCurrentId(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      (async () => {
        try {
          const data = await fetchData(number, title, difficulty, language);
          setAnswers(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      })();
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [number, title, difficulty, language, setAnswers]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          className={styles.searchbar}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a name here..."
        />
        <button onClick={() => router.push("/main/create")}>CREATE</button>
        {currentId && <button onClick={deleteAnswer}>DELETE</button>}
      </div>
      <ul className={styles.listContainer}>
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`${styles.answerContainer} ${selectedIndex === index ? styles.clicked : ""}`}
            onClick={() => {
              setCurrentId(answer.id);
              setSelectedIndex(index);
            }}
          >
            <div className={styles.title}>
              <p>{`${answer.number}.`}</p>
              <p>{answer.title}</p>
            </div>
            <div className={styles.specs}>
              <p>{`Difficulty: ${answer.difficulty}`}</p>
              <p>{`Language: ${answer.language}`}</p>
            </div>
            <button
              onClick={() => {
                router.push(`/main/${answer.title}?id=${answer.id}`);
                setIndex(null);
                setCurrentId(null);
              }}
            >
              GO
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
