"use client";

import InfoEntry from "@/components/InfoEntry/InfoEntry";
import { useState } from "react";

export default function Home() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

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