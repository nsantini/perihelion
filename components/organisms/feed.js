import { Stack } from "@chakra-ui/react";
import MessageForm from "./messageForm";
import MessageCard from "../molecules/message";
import Container from "../atoms/container";
import useFeed from "../../hooks/feed";
import RepliesLink from "../atoms/repliesLink";

export default function Feed({ hops }) {
  const { feed, isLoading, isError, mutate } = useFeed(hops);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && (!feed || !feed.map)) return <div>No data found</div>;

  const newMesssage = (msg) => {
    mutate([{ replyCount: 0, messages: [msg] }, ...feed]);
  };

  return (
    <Stack>
      <Container>
        <MessageForm newMesssage={newMesssage} />
      </Container>
      {(feed || []).map((thread, index) => (
        <Container key={index}>
          <MessageCard {...thread.messages[0]} />
          <RepliesLink
            msgId={thread.messages[0].msgId}
            replyCount={thread.replyCount}
          />
        </Container>
      ))}
    </Stack>
  );
}
