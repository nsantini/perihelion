import { useRouter } from "next/router";
import { Stack, Center, Link, useColorModeValue } from "@chakra-ui/react";
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
        feed.map((thread, index) => (
          <Container key={index}>
            <MessageCard {...thread.messages[0]} />
            <Center>
              <Link
                color={useColorModeValue("frost.700", "frost.500")}
                mt="2"
                href={`/thread/${encodeURIComponent(thread.messages[0].key)}`}
              >
                {thread.replyCount} replies
              </Link>
            </Center>
          </Container>
        ))}
    </Stack>
  );
}
