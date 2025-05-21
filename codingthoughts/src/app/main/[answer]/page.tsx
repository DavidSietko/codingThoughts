import { checkAuth } from "@/app/lib/auth";
import { Answer } from "@/app/lib/types/Answer";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home({ params }: { params: { answer: string } }) {
    const [answer, setAnswer] = useState<Answer>();
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        try {
            const response = async() => {
                await checkAuth();
            }
        }catch( error: any) {
            setNotFound(true);
        }
    }, []);

    if(notFound) return <div>404 PAGE NOT FOUND</div>;

    return (
        <div>

        </div>
    );
}