export default function messageFormat(message, name, date, messagesArea) {
    const messageDiv = document.createElement('div');
    messageDiv.style.width = "90%";
    messageDiv.style.backgroundColor = "aqua";
    messageDiv.style.margin = "10px auto";
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "20px";
    messageDiv.style.display = "flex";
    messageDiv.style.justifyContent = "space-between";

    // Create the sender's name span
    const senderSpan = document.createElement('span');
    senderSpan.style.fontWeight = 'bold'; // Apply bold style
    senderSpan.style.fontSize = '1rem';
    senderSpan.style.textDecoration = 'underline';
    senderSpan.style.marginRight = '5px'; // Add a little space
    senderSpan.textContent = name + ' :';

    // Create the message text span
    const messageTextSpan = document.createElement('span');
    messageTextSpan.style.wordBreak = 'break-word';
    messageTextSpan.textContent = message;

    // Create the timestamp span
    const timestampSpan = document.createElement('span');
    timestampSpan.style.marginLeft = '10px';
    timestampSpan.textContent = date;
    timestampSpan.style.whiteSpace = 'nowrap';

    // Create a container for sender and message
    const senderMessageContainer = document.createElement('div');
    senderMessageContainer.style.display = 'flex';
    senderMessageContainer.style.flexWrap = 'wrap';

    senderMessageContainer.appendChild(senderSpan);
    senderMessageContainer.appendChild(messageTextSpan);

    // Append the spans to messageDiv
    messageDiv.appendChild(senderMessageContainer);
    messageDiv.appendChild(timestampSpan);

    messagesArea.current.appendChild(messageDiv);
}