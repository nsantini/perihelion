import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import MessageCard from "../../components/molecules/message";
import MessageForm from "../../components/molecules/messageForm";
import Container from "../../components/atoms/container";
import useFeed from "../../hooks/feed";

export default function Feed() {
  const router = useRouter();

  const { hops } = router.query;
  const { feed, isLoading, isError } = useFeed(hops);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      <Container>
        <MessageForm />
      </Container>

      {feed &&
        feed.map &&
        feed.map((thread, idx) => (
          <Container key={idx}>
            {thread.messages.map((post, index) => (
              <MessageCard {...post} index={index} />
            ))}
            <MessageForm root={thread.messages[0].key} />
          </Container>
        ))}
    </Stack>
  );
}
