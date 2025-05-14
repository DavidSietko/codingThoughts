export async function handleLogin(email: string, password: string): Promise<{ message: string }> {

    const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    // Return the data
    console.log(data);
    return data;
}

export async function handleSignup(username: string, email: string, password: string): Promise<{ message: string }> {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, email: email, password: password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }
        return data;
}

export async function checkAuth() {
    // Get backend response
    const response = await fetch("/api/login", {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();

    // If response invalid, re-route user
    if(!response.ok) {
        throw new Error(data.message || "Authorization failed");
    }
    return data;
}