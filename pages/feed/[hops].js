import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import MessageCard from "../../components/molecules/message";
import Post from "../../components/molecules/post";
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
        <Post />
      </Container>

      {feed &&
        feed.map &&
        feed.map((thread, idx) => (
          <Container key={idx}>
            {thread.messages.map((post, index) => (
              <MessageCard {...post} index={index} />
            ))}
            <Post root={thread.messages[0].key} />
          </Container>
        ))}
    </Stack>
  );
}
