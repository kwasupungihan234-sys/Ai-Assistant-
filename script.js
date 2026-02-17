document.getElementById("send-button").addEventListener("click", async function() {
    const input = document.getElementById("user-input");
    const message = input.value;

    // Display user's message
    displayMessage("You: " + message);

    // Call the API
    const response = await callChatGPT(message);
    displayMessage("Bot: " + response);

    // Clear the input
    input.value = "";
});

function displayMessage(message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function callChatGPT(message) {
    const apiKey = "AIzaSyBnw6Qc7TUtWPT1psUVx9iyrIsjyFH4NdU"; // Use your API key here
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-3-pro-preview:generate";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "prompt": message,
            "max_output_tokens": 100,
            "temperature": 0.9
        })
    });

    const data = await response.json();
    return data.output; // Adjust according to the API's response structure
}
