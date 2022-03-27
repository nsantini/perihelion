import { useRouter } from 'next/router'
import { Flex, SimpleGrid } from "@chakra-ui/react";
import MessageCard from "../../components/message";
import useFeed from "../../hooks/feed";

export default function Feed() {
  const router = useRouter()
  const { hops } = router.query
  const { feed, isLoading, isError } = useFeed(hops);
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <SimpleGrid columns={{ base: 1 }} width="100%">
      {feed &&
        feed.map((post, index) => (
          <Flex mt="2" key={index}>
            <MessageCard {...post} index={index} />
          </Flex>
        ))}
    </SimpleGrid>
  );
}
