"use client";

import { useSession, signOut } from "next-auth/react";
import Newchat from "./Newchat";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import Chathistory from "./Chathistory";



function sidebar() {
  const { data: session } = useSession();

  //use user email to find memory
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  console.log(chats)
  return (
    <div className="flex flex-col h-screen p-2 bg-[#202123]">
      <div className="flex-1">
        <p className="font-bold text-center m-2">FarmGPT</p>
        <div className="space-y-2">
          <Newchat />
          <p className="text-[#707070]">Chat History</p>
          <p className="text-[#707070] mx-2">詢問-</p>
          {/**Map through the chatrows */}
          {chats?.docs.map(chat => (
            <Chathistory key={chat.id} id={chat.id}/>
          ))}
          <p className="text-[#707070] mx-2">計算</p>
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          className="h-8 w-8 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </div>
  );
}

export default sidebar;
