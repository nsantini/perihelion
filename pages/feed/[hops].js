import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import useFeed from "../../hooks/feed";
import MessageForm from "../../components/organisms/messageForm";
import Container from "../../components/atoms/container";
import Feed from "../../components/molecules/feed";

export default function FeedPage() {
  const router = useRouter();
  const { hops } = router.query;

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

      <Feed feed={feed} />
    </Stack>
  );
}
