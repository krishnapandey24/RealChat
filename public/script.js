// Connect to WebSocket server (replace 'ws://your_server_url' with your WebSocket server URL)
const socket = new WebSocket('ws://localhost:3000');

// Function to append a message to the chat area
function appendMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message; // Use textContent to handle text
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for when the WebSocket connection is established
socket.addEventListener('open', (event) => {
    appendMessage('Connected to the chat server.');
});

// Event listener for incoming messages from the server
socket.addEventListener('message', (event) => {
    if (message instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (blobEvent) => {
            const textMessage = blobEvent.target.result;
            appendMessage(textMessage);
        };
        reader.readAsText(message);
    } else {
        appendMessage(message);
    }
});

// Event listener for when the user clicks the "Send" button
document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    // Send the message as a text string to the server
    socket.send(message);

    // Clear the input field
    messageInput.value = '';
});
