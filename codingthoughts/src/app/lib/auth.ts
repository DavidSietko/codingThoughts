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
    // If response invalid, re-route user
    if(!response.ok) {
        throw new Error("Looks like you are not logged in. Please log in before continuing.");
    }

    const data = await response.json();

    return data;
}

export async function handleLogout() {
    const response = await fetch("/api/update/logout", {
        method: "GET",
        credentials: "include"
    });
    // await the response data
    const data = await response.json();
    // check if response valid
    if(!response.ok) {
        throw new Error(data.message || "There was an error logging out");
    }

    return data;
}

export default function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
