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
                // get response from backend for fetching username and email
                const response = await fetch("/api/update", {
                    method: "GET",
                    credentials: "include"
                });
                // await data
                const data = await response.json();

                // check if response was ok
                if(!response.ok) {
                    throw new Error(data.message);
                }
                // set data and indicate that user logged in
                setUsername(data.username);
                setEmail(data.email);
                setLoggedIn(true);
            } catch(error: any) {
                console.log(error.message);
                setLoggedIn(false);
            }
        };
        handler();
    }, []);

    if(!loggedIn) {
        return (
            <div>
                <span>Error. Please log in before continuing</span>
            </div>
        );
    }
    else {
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
}