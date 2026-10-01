const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


// Send chat question to backend
export async function askCodeCompass(question) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question: question,
        }),
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        // response had no JSON body
    }

    if (!response.ok) {
        // Shows the backend's message, like "AI is busy right now..."
        throw new Error(data?.detail || "Failed to get response");
    }

    return data.answer;
}


// Upload repository ZIP
export async function uploadRepository(file) {

    const formData = new FormData();

    formData.append("file", file);


    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });


    let data = null;
    try {
        data = await response.json();
    } catch {
        // response had no JSON body
    }


    if (!response.ok) {
        console.log("Backend error:", data);
        throw new Error(data?.detail || "Upload failed");
    }


    return data;
}