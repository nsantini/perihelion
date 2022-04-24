import Container from "../atoms/container";
import MessageCard from "./message";
import MessageForm from "../organisms/messageForm";

export default function Tread({ thread, mutate }) {
  const newMesssage = (msg) => {
    mutate({ ...thread, messages: [msg, ...thread.messages] });
  };
  return (
    <>
      {thread.messages.map((post, index) => (
        <Container key={index}>
          <MessageCard {...post} index={index} />
        </Container>
      ))}
      <Container>
        <MessageForm
          root={thread.messages[0].msgId}
          recps={thread.messages[0].recps}
          newMesssage={newMesssage}
        />
      </Container>
    </>
  );
}
