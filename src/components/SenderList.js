import React from 'react';

function SenderList({ messages, setSelectedSender, selectedSender }) {
    console.log("Data is inside SenderList:", messages);

    const senders = Object.keys(messages);

    return (
        <div className="sender-list">
            {senders.length === 0 ? (
                <div>No messages</div>
            ) : (
                senders.map((sender, index) => (
                    <div
                        key={index}
                        className={`sender ${selectedSender === sender ? 'active' : ''}`}
                        onClick={() => setSelectedSender(sender)}
                    >
                        {sender}
                    </div>
                ))
            )}
        </div>
    );
}

export default SenderList;