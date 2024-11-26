import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import Footer from "../componets/Footer";
import "../css/chatPage.css";

interface Chat {
  id: string;
  lastMessage: string;
  lastMessageTime: any;
  otherUserId: string;
  otherUserImage: string;
  otherUserName: string;
}

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? "";
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chat[]>([]);
  const [rightSwipes, setRightSwipes] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/");
        return;
      }

      if (currentUser.uid !== user_uid) {
        navigate(`/LandingPage/${currentUser.uid}`, { replace: true });
      }
    };

    const fetchChatsAndRightSwipes = async () => {
      setIsLoading(true);

      try {
        const chatsRef = collection(db, "Chats");
        const chatQuery = query(chatsRef, where("user1", "==", user_uid));
        const chatDocs = await getDocs(chatQuery);

        const fetchedChats: Chat[] = [];
        const userIdsToFetch = new Set<string>();

        chatDocs.forEach((chatDoc) => {
          const chatData = chatDoc.data();
          const otherUserId =
            chatData.user1 === user_uid ? chatData.user2 : chatData.user1;

          const otherUserId = chatData.user1 === user_uid ? chatData.user2 : chatData.user1;


          fetchedChats.push({
            id: chatDoc.id,
            lastMessage: chatData.lastMessage || "Start a conversation",
            lastMessageTime: chatData.lastMessageTime || null,
            otherUserId,
            otherUserImage: "",
            otherUserName: "",
          });
        });

        const userDocRef = doc(db, "Users", user_uid);
        const userDocSnap = await getDoc(userDocRef);

        const unmatchedRightSwipes: User[] = [];
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const rightSwipesIds = userData.swipes?.right || [];

          for (const otherUserId of rightSwipesIds) {

            const hasChat = fetchedChats.some(
              (chat) => chat.otherUserId === otherUserId
            );


            if (!hasChat) {
              const otherUserDoc = await getDoc(doc(db, "Users", otherUserId));
              if (otherUserDoc.exists()) {
                const otherUserData = otherUserDoc.data();
                unmatchedRightSwipes.push({
                  uid: otherUserId,
                  firstName: otherUserData.firstName || "Unknown",
                  lastName: otherUserData.lastName || "User",
                  imageUrl:
                    otherUserData.images?.[0] || "/default-profile.png",
                  imageUrl: otherUserData.images?.[0] || "/default-profile.png",
                });

                await setDoc(doc(db, "Chats", `${user_uid}_${otherUserId}`), {
                  user1: user_uid,
                  user2: otherUserId,
                  lastMessage: `${otherUserData.firstName} swiped on you, start a conversation`,
                  lastMessageTime: new Date(),
                });
              }
            }
          }
        }

        const uniqueUserIds = Array.from(userIdsToFetch);
        const userDetailsFetched: Record<string, User> = {};

        for (const userId of uniqueUserIds) {
          const userDoc = await getDoc(doc(db, "Users", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userDetailsFetched[userId] = {
              uid: userId,
              firstName: userData.firstName || "Unknown",
              lastName: userData.lastName || "User",

              imageUrl:
                userData.images?.[0] || "/default-profile.png",

            };
          }
        }

        const chatsWithDetails = fetchedChats.map((chat) => ({
          ...chat,

          otherUserImage:
            userDetailsFetched[chat.otherUserId]?.imageUrl ||
            "/default-profile.png",
          otherUserName: `${
            userDetailsFetched[chat.otherUserId]?.firstName || "Unknown"
          } ${
            userDetailsFetched[chat.otherUserId]?.lastName || "User"
          }`,

        }));

        setChats(chatsWithDetails);
        setRightSwipes(unmatchedRightSwipes);
      } catch (error) {
        console.error("Error fetching chats or right swipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuthorization();
    fetchChatsAndRightSwipes();
  }, [user_uid, navigate]);

  return (
    <div className="chat-page-container flex flex-col min-h-screen">
      <header className="chat-page-header">
        <h1>Your Chats</h1>
      </header>

      <main className="chat-list-container">
        {isLoading ? (
          <p>Loading chats...</p>
        ) : (
          <>
            {chats.map((chat) => (
              <div key={chat.id} className="chat-card">
                <Link to={`/chatting/${user_uid}/${chat.otherUserId}`}>
                  <img
                    src={chat.otherUserImage}
                    alt={chat.otherUserName}
                    className="chat-card-avatar"
                  />
                  <div className="chat-card-content">
                    <h2>{chat.otherUserName}</h2>
                    <p>{chat.lastMessage}</p>
                  </div>
                </Link>
              </div>
            ))}
            {rightSwipes.map((user) => (
              <div key={user.uid} className="chat-card">
                <Link to={`/chatting/${user_uid}/${user.uid}`}>
                  <img
                    src={user.imageUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="chat-card-avatar"
                  />
                  <div className="chat-card-content">
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                    <p>Start a conversation</p>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default ChatPage;
