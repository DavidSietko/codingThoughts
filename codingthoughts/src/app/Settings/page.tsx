"use client";

import InfoEntry from "@/components/InfoEntry/InfoEntry";
import { useEffect, useState } from "react";
import { checkAuth } from "../lib/auth";
import ErrorMessage from "@/components/form/ErrorMessage";

export default function Home() {
    // boolean to see if user logged in or not
    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [originalEmail, setOriginalEmail] = useState<string>("");

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
                setOriginalEmail(data.email);
                setLoggedIn(true);
            } catch(error: any) {
                console.log(error.message);
                setLoggedIn(false);
            }
        };
        handler();
    }, []);

    const updateUsername = async(): Promise<boolean> => {
        try {
            // get response from changing username
            const response = await fetch("/api/update/username", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username
                })
            });
            // get the data
            const data = await response.json();
            // check if ok
            if(!response.ok) {
                throw new Error(data.message);
            }
            return true;
        } catch(error: any) {
            setUsernameErrorMessage(error.message);
            return false;
        }
    }

    const updateEmail = async(): Promise<boolean> => {
        try {
            // get the response of sending the email to new email
            const response = await fetch("/api/update/email", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();

            // check if response was good
            if(!response.ok) {
                throw new Error(data.message);
            }
            // if good response alert
            alert("EMAIL HAS BEEN SENT");
            return await new Promise<boolean>((resolve, reject) => {
                let intervals = 0;
                const maxAttempts = 24; // 24 attempts × 5s = 2 minutes
      
                const timer = setInterval(async () => {
                    try {
                        intervals++;

                        // Check for email updateconsole.log(`email: ${email}`);
                        const checkResponse = await fetch("/api/update/emailUpdateCheck", {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: originalEmail }) // Send original email for comparison
                        });

                        const checkData = await checkResponse.json();

                        if (!checkResponse.ok) {
                            clearInterval(timer);
                            reject(new Error(checkData.message));
                            return;
                        }

                        // Success case - email changed in database
                        if (checkData.status) {
                            clearInterval(timer);
                            setEmail(checkData.email); // Update local state
                            resolve(true); // Return true for success
                            return;
                        }

                        // Timeout after 2 minutes
                        if (intervals >= maxAttempts) {
                            clearInterval(timer);
                            reject(new Error("Verification link expired. Please request a new one."));
                        }
                } catch (error) {
                    clearInterval(timer);
                    reject(error);
                }
                }, 5000); // Check every 5 seconds
            // Cleanup on component unmount
            return () => clearInterval(timer);
            });
        } catch(error: any) {
            setEmailErrorMessage(error.message);
            return false;
        }
    }

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
                    <div className="entryContainer">
                        <InfoEntry entry="Username" value={username} setValue={setUsername} updateValue={updateUsername}/>
                        <ErrorMessage errorMessage={usernameErrorMessage} setErrorMessage={setUsernameErrorMessage} />
                    </div>
                    <div>
                        <InfoEntry entry="Email" value={email} setValue={setEmail} updateValue={updateEmail} />
                        <ErrorMessage errorMessage={emailErrorMessage} setErrorMessage={setEmailErrorMessage} />
                    </div>
                </div>
                <div>
                    <button>LOGOUT</button>
                    <button>DELETE ACCOUNT</button>
                </div>
            </div>
        );
    }
}