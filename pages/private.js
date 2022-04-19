import { Stack } from "@chakra-ui/react";
import Thread from "../components/molecules/thread";
import Container from "../components/atoms/container";
import usePrivate from "../hooks/usePrivate";

export default function FeedPage() {
  const { threads, isLoading, isError } = usePrivate();

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      {threads &&
        threads.map((thread, index) => (
          <Container key={index}>
            <Thread thread={thread} />
          </Container>
        ))}
    </Stack>
  );
}
