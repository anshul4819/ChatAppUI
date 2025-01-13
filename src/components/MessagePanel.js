import React, { useState } from 'react';
import Message from './Message';
import { sendMessage } from './api';
import '../styles/App.css';


function MessagePanel({ messages, sender, currUser, endpoint, setMessages }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        try {
            const data = await sendMessage(endpoint, currUser, sender, message);
            if (data.status === 'success') {
                setMessage('');
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [sender]: [...(prevMessages[sender] || []), {"sender": currUser, "content": message, "timestamp": new Date().toLocaleString()}]
                }));
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    if (!sender) {
        return <div className="message-panel">Please select a person to view messages.</div>;
    }

    return (
        <div className="message-panel">
            <div className="messages">
                {Array.isArray(messages[sender]) && messages[sender].map((msg, index) => 
                    <Message key={index} sender={msg.sender} msg={msg.content} timestamp={msg.timestamp} currUser={currUser} />
                )}
            </div>
            
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="send-button-container">
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default MessagePanel;