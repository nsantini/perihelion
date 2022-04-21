import Container from "../atoms/container";
import MessageCard from "./message";
import MessageForm from "../organisms/messageForm";

export default function Tread({ thread }) {
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
        />
      </Container>
    </>
  );
}
