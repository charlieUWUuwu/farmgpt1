"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormEvent } from "react";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const sendQuestion =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return;

    const input = prompt.trim()
    setPrompt("")

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https"//ui-avatars.com/api/?name=${session?.user?.name}`
      }
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    )
  }

  return (
    <div>
      <div className="flex m-2 space-x-3">
        <div>當前模型:</div>

        <div className="rounded-lg bg-[#4F505B] w-1/3 flex relative">
          <button className="text-white flex items-center">
            <Bars3Icon className="h-4 w-4" />
          </button>

          {/**model selection */}
          <div className="bg-[#464c91] space-y-1 p-2 rounded-lg absolute inset-x-0 -top-24">
            <p className="block hover:bg-black">gpt3-damo-base-zh</p>
            <p className="block hover:bg-black">gpt3-damo-large-zh</p>
            <p className="block hover:bg-black">gpt4all</p>
          </div>
        </div>
      </div>
      <div className="bg-[#343541] text-gray-400 rounded-lg text-sm border-2 border-[#10E5B2] ">
        <form onSubmit={sendQuestion} className="p-5 space-x-5 flex">
          <input
            value={prompt}
            disabled={!session}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            type="text"
            placeholder="敬請發問任何農業的問題~有關作物、施肥、實作、預期成效..."
          />

          <button 
          disabled={!prompt || !session} 
          type="submit"
          className=" bg-[#E7E7E7] hover:opacity-50 "
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45 fill-[#10E5B2] text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
