import Link from "next/link";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";

type Props = {
  id: string;
};

function Chathistory({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );
  //知道該次對話是否被選取
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  //delete and go to home
  const removeChat = async () => {
    await deleteDoc(doc(db, "user", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chathistory justify-center ${active && "bg-[#0B755C]"}`}
    >
      <ChatBubbleLeftIcon className="h-4 w-4" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        /**抓最後一次的文字，否則就新開頭 */
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-4 w-4 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
}

export default Chathistory;
