"use client";

import { db } from "@/firebase";

import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormEvent } from "react";
import { addDoc, collection } from "firebase/firestore";
import models from "../src/models.json";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const sendQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https"//ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-3/4 ">
      <div className="flex m-2 space-x-3 items-center">
        <div>當前模型:</div>

        <div className="rounded-lg bg-[#4F505B] w-1/3 flex relative">
          <button 
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white flex items-center justify-between p-2 "
          >
            choose a model
            </button>
            {isOpen && (
            <div className="bg-[#0B755C]  rounded-lg absolute inset-x-0 -top-28">
              {models.map((item, i) => (
                <div>
                  <p className="block w-full p-2 hover:bg-black cursor-pointer rounded-lg">
                    {item.model}
                  </p>
                  
                  
                </div>
              ))}
            </div>
          )}
          {/**model selection */}
          
        </div>
      </div>
      <div className="bg-[#343541] text-gray-400 rounded-lg text-sm border-2 border-[#10E5B2] ">
        <form onSubmit={sendQuestion} className="p-3 space-x-5 flex">
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
            className=" bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4 -rotate-45"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>


          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
