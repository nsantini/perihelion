import { Center, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import MessageForm from "./messageForm";
import MessageCard from "../molecules/message";
import Container from "../atoms/container";
import useFeed from "../../hooks/feed";

export default function Feed({ hops }) {
  const { feed, isLoading, isError, mutate } = useFeed(hops);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const newMesssage = (msg) => {
    mutate([{ replyCount: 0, messages: [msg] }, ...feed]);
  };

  return (
    <Stack>
      <Container>
        <MessageForm newMesssage={newMesssage} />
      </Container>
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
    </Stack>
  );
}
