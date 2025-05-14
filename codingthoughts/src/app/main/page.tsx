"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Filterbox from "@/components/filter/Filterbox";
import { useRouter } from "next/navigation";
import { checkAuth } from "../lib/auth";

export default function Home() {
    // define a useState for the input
    const [name, setName] = useState<string>("");

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
            <input className={styles.searchbar} type="text" value={name} onChange={(e) => { setName(e.target.value)}} placeholder="Enter a name here..."></input>
        </div>
    );
}