import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: 'John Doe', lastMessage: 'Hey! How’s it going?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'All good! What about you?' },
    { id: 3, name: 'Tommy Baker', lastMessage: 'Catch you later!' },
  ]);

  const deleteChat = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Chats</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          {chats.length === 0 ? (
            <p className="text-center p-4">No chats available</p>
          ) : (
            chats.map((chat) => (
              <div key={chat.id} className="block border-b border-gray-200 p-4 flex justify-between items-center">
                <Link to={`/chat/${chat.id}`} className="flex-grow">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">{chat.name}</h2>
                    <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                  </div>
                </Link>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Delete
                </button>
              </div>
            ))
          )}
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

export default ChatPage;
