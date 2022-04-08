import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import MessageCard from "../../components/molecules/message";
import MessageForm from "../../components/molecules/messageForm";
import Container from "../../components/atoms/container";
import Thread from "../../components/organisms/thread";
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
        feed.map((thread, idx) => <Thread thread={thread} key={idx} />)}
    </Stack>
  );
}
