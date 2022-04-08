import Container from "../atoms/container";
import MessageCard from "../molecules/message";
import MessageForm from "../molecules/messageForm";

export default function Tread({ thread }) {
  return (
    <Container>
      {thread.messages.map((post, index) => (
        <MessageCard {...post} index={index} />
      ))}
      <MessageForm root={thread.messages[0].key} />
    </Container>
  );
}
