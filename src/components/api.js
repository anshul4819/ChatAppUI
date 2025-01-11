// src/utils/api.js
export const sendMessage = async (endpoint, sender, receiver, content) => {
    try {
        const response = await fetch(`${endpoint}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sender, receiver, content }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
    }
};