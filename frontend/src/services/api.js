const API_BASE_URL = "http://127.0.0.1:8000";


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

    if (!response.ok) {
        throw new Error("Failed to get response");
    }

    const data = await response.json();

    return data.answer;
}


// Upload repository ZIP
export async function uploadRepository(file) {

    const formData = new FormData();

    formData.append("file", file);


    const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
    });


    const data = await response.json();


    if (!response.ok) {
        console.log("Backend error:", data);
        throw new Error(data.detail || "Upload failed");
    }


    return data;
}