import Chatdialogue from "@/components/Chatdialogue";
import Chatinput from "@/components/Chatinput";

type Props = {
  params: {
    id: string;
  };
};

function Chatpage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chatdialogue chatId={id} />
      <div className="flex justify-center m-2">
        <Chatinput chatId={id} />
      </div>
    </div>
  );
}

export default Chatpage;
