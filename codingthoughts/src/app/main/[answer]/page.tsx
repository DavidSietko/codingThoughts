"use client";

import { checkAuth } from "@/app/lib/auth";
import { Answer } from "@/app/lib/types/Answer";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'next/navigation';


export default function Home() {
    // useState for answer and if answer was found
    const [currentAnswer, setCurrentAnswer] = useState<Answer>();
    const [notFound, setNotFound] = useState<boolean>(false);

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
                    alert(data);
                    setCurrentAnswer(data);
                } catch(error: any) {
                    console.log(error.message);
                    setNotFound(true);
                }
            }
            fetchAnswer();
    }, []);

    if(notFound) return <div>404 PAGE NOT FOUND</div>;

    return (
        <div>

        </div>
    );
}