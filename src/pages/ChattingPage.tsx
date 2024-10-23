import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const ChattingPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch or mock chat messages based on the chatId
    const chatMessages: Message[] = [
      { id: 1, text: 'Hey! How are you?', sender: 'John', timestamp: '10:30 AM' },
      { id: 2, text: 'Doing well, how about you?', sender: 'You', timestamp: '10:31 AM' },
      { id: 3, text: 'Great to hear!', sender: 'John', timestamp: '10:32 AM' },
    ];
    setMessages(chatMessages);
  }, [chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/chat" className="text-white text-lg">&lt; Back to Chats</Link>
          <h1 className="text-2xl font-bold">Chat with John</h1> {/* Customize based on selected chat */}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md border-4 border-primary rounded-lg overflow-hidden bg-white">
          <div className="p-4">
            {/* Chat Messages */}
            <div className="overflow-y-auto h-64 bg-gray-100 p-2 rounded">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <div className="flex justify-between items-center">
                    <div className={`inline-block px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-gray-300 text-black'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Input for new message */}
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary text-white px-4 py-2 rounded-lg ml-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-around">
            <Link to="/LandingPage" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/match" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span className="text-xs mt-1">Match</span>
            </Link>
            <Link to="/chat" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span className="text-xs mt-1">Chat</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ChattingPage;
