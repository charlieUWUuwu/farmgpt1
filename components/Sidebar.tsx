"use client";
import { SunIcon } from "@heroicons/react/24/solid";
import Newchat from "./Newchat";
import { useSession, signOut } from "next-auth/react";
import Chathistory from "./Chathistory";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";

function sidebar() {
  const { data: session } = useSession();
  //change data to session variable

  //use user email to find memory
  const [chats, loading, error] = useCollection(
    session && 
    query(
      collection(db, "users", session.user?.email!, "chats"),
      orderBy("createdAt", "asc")
    )
  );

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <p>FarmGPT</p>
        <div>
          {/**new chat選擇 */}
          <Newchat />
          
          {/**Map through the chatrows */}
          {chats?.docs.map(chat => (
            <Chathistory key={chat.id} id={chat.id}/>
          ))}
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={sessionStorage.user?.image!}
          alt="Profile pic"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </div>
  );
}

export default sidebar;
