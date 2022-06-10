import { Center, Link, useColorModeValue } from "@chakra-ui/react";
import Container from "../atoms/container";
import MessageCard from "./message";
import MessageForm from "../organisms/messageForm";

export default function Tread({ thread, mutate }) {
  const newMesssage = (msg) => {
    mutate && mutate({ ...thread, messages: [msg, ...thread.messages] });
  };
  return (
    <>
      {thread.messages.map((post, index) => (
        <Container key={index}>
          <MessageCard {...post} index={index} />
          {post.replies > 0 && (
            <Center>
              <Link
                color={useColorModeValue("frost.700", "frost.500")}
                mt="2"
                href={`/thread/${encodeURIComponent(post.msgId)}`}
              >
                {post.replies} replies
              </Link>
            </Center>
          )}
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
