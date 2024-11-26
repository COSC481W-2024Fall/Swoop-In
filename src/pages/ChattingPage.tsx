import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../componets/Footer';
import LastActive from '../componets/LastActive';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const ChattingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? ""; 
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
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
      <LastActive/>
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

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default ChattingPage;
