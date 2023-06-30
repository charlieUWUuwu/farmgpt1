"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

function Newchat() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    //push to firebase
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  return (
    <div className="border-[#10E5B2] border-2 rounded-lg">
      <div className="flex items-center justify-center p-2 text-[#10E5B2]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>

        <p>New chat</p>
      </div>

      <div className="flex mx-2">
        <div
          onClick={createNewChat}
          className="border-[#10E5B2] border-2 chatRow grow m-2 py-1"
        >
          詢問
        </div>
        <div className="border-[#10E5B2] border-2 chatRow grow m-2 py-1">
          計算
        </div>
      </div>
    </div>
  );
}

export default Newchat;
