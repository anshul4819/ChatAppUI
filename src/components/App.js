import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import SenderList from './SenderList';
import MessagePanel from './MessagePanel';
import NewMessageToUser from './NewMessageToUser';
import '../styles/App.css';

const ENDPOINT = "https://chatapp-52bs.onrender.com"
console.log("Environment variable: ", process.env.REACT_APP_API_URL);
function App() {
    const [messages, setMessages] = useState({});
    const [selectedSender, setSelectedSender] = useState('');
    const [currUser, setCurrUser] = useState('');
    const [isCurrentUserSet, setIsCurrentUserSet] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
    
        if (isCurrentUserSet) {
            socket.on('connect', () => {
                console.log('Connected to server');
                socket.emit('join', currUser);
            });

            socket.on('new_message', (data) => {
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [data.sender]: [...(prevMessages[data.sender] || []), data]
                }));
            });

            socket.on('all_messages', (data) => {
                setMessages(data);
            });
            console.log("Data is :", messages)
        }

        return () => {
            if (isCurrentUserSet) {
                socket.disconnect();
            }
        };
    }, [isCurrentUserSet, currUser]);

    const handleSetCurrentUser = () => {
        setIsCurrentUserSet(true);
    };

    return (
        <div className="App">
            <h1>Hi {currUser}</h1>
            {!isCurrentUserSet ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={currUser}
                        onChange={(e) => setCurrUser(e.target.value)}
                    />
                    <button onClick={handleSetCurrentUser}>Set Current User</button>
                </div>
            ) : (
                <>
                    <div>
                        <NewMessageToUser currUser={currUser} endpoint={ENDPOINT} setMessages={setMessages} />
                    </div>
                    <div className="chat-container">
                        <SenderList messages={messages} setSelectedSender={setSelectedSender} selectedSender={selectedSender} />
                        <MessagePanel messages={messages} sender={selectedSender} currUser={currUser} endpoint={ENDPOINT} setMessages={setMessages} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
