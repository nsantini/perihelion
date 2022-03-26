import { Flex, SimpleGrid } from "@chakra-ui/react";
import MessageCard from "../components/message";
import useFeed from "../hooks/feed";

export default function Home({ posts }) {
  const { feed, isLoading, isError } = useFeed();
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <SimpleGrid columns={{ base: 1 }} width="100%">
      {feed.map((post, index) => (
        <Flex mt="2" key={index}>
          <MessageCard {...post} index={index} />
        </Flex>
      ))}
    </SimpleGrid>
  );
}
