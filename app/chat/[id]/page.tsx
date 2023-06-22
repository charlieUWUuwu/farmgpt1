import ChatDialogue from "@/components/ChatDialogue";
import ChatInput from "@/components/ChatInput";

type Props = {
    params: {
        id: string
    }
}

function Chatpage({params: {id}}: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ChatDialogue chatId={id}/>
      <ChatInput chatId={id}/>
    </div>
  );
}

export default Chatpage;
