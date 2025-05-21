export async function fetchData(number: string, title: string, difficulty: string, language: string) {
    const response = await fetch("/api/answer/get", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number: number, title: title, difficulty: difficulty, language: language })
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message);
    }
    else {
        return data;
    }
}