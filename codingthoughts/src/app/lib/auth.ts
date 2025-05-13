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
        throw new Error(data.message);
    }
    // Return the data
    alert("Login Successful, hurray");
    console.log(data);
    return data;
}

export async function handleSignup(username: string, email: string, password: string): Promise<{ message: string }> {
    try {
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

        alert("Signup Successful, hurray");
        return data;
    } catch (error) {
        console.error("Signup error:", error);
        // Re-throw the error with a user-friendly message if it's not already an Error object
        throw error instanceof Error ? error : new Error("An unexpected error occurred during signup");
    }
}