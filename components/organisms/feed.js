import { Center, Link, useColorModeValue } from "@chakra-ui/react";
import Container from "../atoms/container";
import MessageCard from "../molecules/message";
import useFeed from "../../hooks/feed";

export default function Feed({ hops }) {
  const { feed, isLoading, isError } = useFeed(hops);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
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
