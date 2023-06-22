"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";


function Newchat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
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
        <PlusIcon className="h-4 w-4 fill-[#10E5B2]" />
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
