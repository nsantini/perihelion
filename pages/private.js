import { Flex, Stack } from "@chakra-ui/react";
import Thread from "../components/molecules/thread";
import usePrivate from "../hooks/usePrivate";

export default function FeedPage() {
  const { threads, isLoading, isError } = usePrivate();

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      {threads &&
        threads.map((thread, index) => (
          <Flex key={index} mt="2" width="100%" direction={"column"}>
            <Thread thread={thread} />
          </Flex>
        ))}
    </Stack>
  );
}
