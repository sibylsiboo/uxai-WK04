const API_URL = "https://api.openai.com/v1/chat/completions";
const  OPENAI_API_KEY = "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";

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    addMessage("You: " + userInput, 'user-message');

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", 
                messages: [
                    { role: "system", content: "You are a mystical tarot reader providing insightful readings based on user questions." },
                    { role: "user", content: userInput },
                ],
            }),
        });

        const data = await response.json();
        console.log("API Response:", data); 
        if (data.choices && data.choices[0]?.message?.content) {
            addMessage("Tarot: " + data.choices[0].message.content, 'tarot-message');
        } else {
            addMessage("Tarot: No response received. Try again.", 'tarot-message');
        }
    } catch (error) {
        console.error("Error:", error);
        addMessage("Error getting a response. Try again.", 'tarot-message');
    }

    document.getElementById("userInput").value = "";
}

function addMessage(message, className) {
    const chatbox = document.getElementById("chatbox");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", className);
    newMessage.textContent = message;
    chatbox.appendChild(newMessage);
    chatbox.scrollTop = chatbox.scrollHeight;  // Auto-scroll to the latest message
}