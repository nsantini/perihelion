import { Center, Link, useColorModeValue } from "@chakra-ui/react";
import Container from "../atoms/container";
import MessageCard from "./message";

export default function Feed({ feed }) {
  return (
    <>
      {feed.map((thread, index) => (
        <Container key={index}>
          <MessageCard {...thread.messages[0]} />
          <Center>
            <Link
              color={useColorModeValue("frost.700", "frost.500")}
              mt="2"
              href={`/thread/${encodeURIComponent(thread.messages[0].msgId)}`}
            >
              {thread.replyCount} replies
            </Link>
          </Center>
        </Container>
      ))}
    </>
  );
}
