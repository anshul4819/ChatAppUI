import React, { useState } from 'react';
import { sendMessage } from './api';

function NewMessageToUser({ currUser, endpoint, setMessages }) {
    const [newReceiver, setNewReceiver] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        const currentMessage = message;
        const currentReceiver = newReceiver;

        setMessage('');
        setNewReceiver('');

        try {
            const data = await sendMessage(endpoint, currUser, currentReceiver, currentMessage);
            if (data.status !== 'success') {
                setMessage(currentMessage);
                setNewReceiver(currentReceiver);
            }
            else {
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [currentReceiver]: [...(prevMessages[currentReceiver] || []), {"sender": currUser, "content": message, "timestamp": new Date().toLocaleString()}]
                }));
                console.log("messages updated successfully")    
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessage(currentMessage);
            setNewReceiver(currentReceiver);
        }
    };

    return (
        <div className="control-panel">
            <input
                type="text"
                placeholder="Send to"
                value={newReceiver}
                onChange={(e) => setNewReceiver(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default NewMessageToUser;