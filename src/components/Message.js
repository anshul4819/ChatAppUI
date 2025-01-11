import React from 'react';
import '../styles/App.css';

function Message({ sender, msg, timestamp, currUser }) {
    const isCurrentUser = sender === currUser;
    const formattedTimestamp = new Date(timestamp).toLocaleString();

    return (
        <div className={`message ${isCurrentUser ? 'current-user' : ''}`}>
            <strong>{isCurrentUser ? 'You' : sender}:</strong> {msg} <span className="timestamp">{formattedTimestamp}</span>
        </div>
    );
}

export default Message;