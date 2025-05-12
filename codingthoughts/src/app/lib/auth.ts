export async function handleLogin(email: string, password: string) {

    const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message);
    }
    // Return the data
    alert("Login Successful, hurray");
    return data;
}

export async function handleSignup(username: string, email: string, password: string) {
    const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message);
    }
    // Return the data
    alert("Signup Successful, hurray");
    return data;
}