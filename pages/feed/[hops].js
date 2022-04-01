import { useRouter } from "next/router";
import { Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import MessageCard from "../../components/message";
import Post from "../../components/post";
import useFeed from "../../hooks/feed";

export default function Feed() {
  const router = useRouter();

  const { hops } = router.query;
  const { feed, isLoading, isError } = useFeed(hops);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <SimpleGrid columns={{ base: 1 }} width="100%">
      <Post />
      {feed &&
        feed.map &&
        feed.map((thread, idx) => (
          <Flex
            mt="2"
            key={idx}
            width="100%"
            direction={"column"}
            boxShadow={"lg"}
            bg={useColorModeValue("grey.50", "polar.100")}
          >
            {thread.messages.map((post, index) => (
              <MessageCard {...post} index={index} />
            ))}
            <Post root={thread.messages[0].key} />
          </Flex>
        ))}
    </SimpleGrid>
  );
}
