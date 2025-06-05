"use client";

import InfoEntry from "@/components/InfoEntry/InfoEntry";
import { useEffect, useState } from "react";
import { checkAuth } from "../lib/auth";

export default function Home() {
    // boolean to see if user logged in or not
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const handler = async() => {
            // see if user logged in and then fetch the username and email from the backend
            try {
                await checkAuth();
                setLoggedIn(true);
            } catch(error: any) {
                console.log("User not logged in.");
                setLoggedIn(false);
            }
        };
        handler();
    }, []);

    return (
        <div>
            <div>
                <InfoEntry entry="Username" value={username} setValue={setUsername} updateValue={() => {}}/>
                <InfoEntry entry="Email" value={email} setValue={setEmail} updateValue={() => {}} />
            </div>
            <div>
                <button>LOGOUT</button>
                <button>DELETE ACCOUNT</button>
            </div>
        </div>
    );
}