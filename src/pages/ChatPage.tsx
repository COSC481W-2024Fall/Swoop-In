import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { collection, getDocs, query, where, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import Footer from "../componets/Footer";
import "../css/chatPage.css";

interface Chat {
  id: string;
  lastMessage: string;
  lastMessageTime: any;
  user1: string;
  user2: string;
  isUnread: boolean;
}

interface RightSwipeUser {
  uid: string;
  firstName: string;
  lastName: string;
  swipeTime: any;
  lastActive: any;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? "";
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chat[]>([]);
  const [rightSwipes, setRightSwipes] = useState<RightSwipeUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/');
        return;
      }

      if (currentUser.uid !== user_uid) {
        navigate(`/LandingPage/${currentUser.uid}`, { replace: true });
      }
    };

    const fetchChatsAndRightSwipes = async () => {
      setIsLoading(true);

      const chatsRef = collection(db, 'Chats');
      const chatQuery = query(chatsRef, where("user1", "==", user_uid));
      const chatDocs = await getDocs(chatQuery);

      const fetchedChats = chatDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isUnread: true,
      })) as Chat[];

      setChats(fetchedChats);

      const userDocRef = doc(db, "Users", user_uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const rightSwipesIds = userData.swipes?.right || [];

        const unmatchedRightSwipes = [];
        for (const otherUserId of rightSwipesIds) {
          const hasChat = fetchedChats.some(
            (chat) => chat.user1 === otherUserId || chat.user2 === otherUserId
          );

          if (!hasChat) {
            const otherUserDoc = await getDoc(doc(db, "Users", otherUserId));
            if (otherUserDoc.exists()) {
              const otherUserData = otherUserDoc.data();
              unmatchedRightSwipes.push({
                uid: otherUserId,
                firstName: otherUserData.firstName,
                lastName: otherUserData.lastName,
                swipeTime: otherUserData.swipeTime || new Date(),
                lastActive: otherUserData.lastActive || new Date(),
              });

              // Add a placeholder chat if no previous chat exists
              await setDoc(doc(db, "Chats", `${user_uid}_${otherUserId}`), {
                user1: user_uid,
                user2: otherUserId,
                lastMessage: `${otherUserData.firstName} swiped on you, start conversation`,
                lastMessageTime: new Date(),
                isUnread: true,
              });
            }
          }
        }

        setRightSwipes(unmatchedRightSwipes);
      }

      setIsLoading(false);
    };

    checkUserAuthorization();
    fetchChatsAndRightSwipes();
  }, [user_uid, navigate]);

  const deleteChat = async (chatId: string) => {
    try {
      await updateDoc(doc(db, "Chats", chatId), { deleted: true });
      setChats(chats.filter((chat) => chat.id !== chatId));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const confirmDelete = (chatId: string) => {
    setDeleteConfirmation(chatId);
  };

  const markChatAsRead = (chatId: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === chatId ? { ...chat, isUnread: false } : chat))
    );
  };

  const getOtherUserId = (chat: Chat) => (chat.user1 === user_uid ? chat.user2 : chat.user1);

  return (
    <div className="chat-page-container flex flex-col min-h-screen">
      
          <h1 className="header">Your Chats</h1>
      
    

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <p>Loading chats...</p>
        ) : (
          <div className="chat-list bg-white rounded-lg shadow-md">
            {chats.length === 0 && rightSwipes.length === 0 ? (
              <p className="text-center p-4">No chats available. Start a conversation with one of your matches!</p>
            ) : (
              <>
                {chats.map((chat) => {
                  const otherUserId = getOtherUserId(chat);
                  const lastMessageTime = chat.lastMessageTime ? new Date(chat.lastMessageTime.seconds * 1000).toLocaleDateString() : '';
                  return (
                    <div key={chat.id} className="chat-item block border-b border-gray-200 p-4 flex justify-between items-center">
                      <Link
                        to={`/chatting/${user_uid}/${otherUserId}`}
                        className="flex-grow"
                        onClick={() => markChatAsRead(chat.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            {chat.isUnread && <span className="unread-dot mr-2"></span>}
                            <div>
                              <h2 className="text-lg font-semibold">Chat with {chat.user1}</h2>
                              <p className="text-sm text-gray-500">{chat.lastMessage || 'Start a conversation'}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">{lastMessageTime}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => confirmDelete(chat.id)}
                        className="delete-button text-red-500 hover:text-red-700 ml-4"
                      >
                        Delete
                      </button>
                      {deleteConfirmation === chat.id && (
                        <div className="confirmation-popup">
                          <p>Are you sure you want to delete this chat?</p>
                          <button onClick={() => deleteChat(chat.id)} className="text-red-500">Yes</button>
                          <button onClick={() => setDeleteConfirmation(null)} className="text-gray-500">Cancel</button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {rightSwipes.map((user) => (
                  <div key={user.uid} className="chat-item block border-b border-gray-200 p-4 flex justify-between items-center">
                    <Link to={`/chatting/${user_uid}/${user.uid}`} className="flex-grow">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="unread-dot mr-2"></span>
                          <div>
                            <h2 className="text-lg font-semibold">
                              {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sm text-gray-500">Start conversation</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{new Date(user.lastActive.seconds * 1000).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default ChatPage;
