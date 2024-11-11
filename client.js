const socket = io();

const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');

// Send message to the server
sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit('chatMessage', message); // Emit message to server
    messageInput.value = ''; // Clear input field
  }
});

// Receive message from the server
socket.on('chatMessage', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
});
