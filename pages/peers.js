import { SimpleGrid } from "@chakra-ui/react";
import usePeers from "../hooks/peers";
import Profile from "../components/organisms/profile";

export default function Peers() {
  const { peers, isLoading, isError } = usePeers();
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <SimpleGrid columns={2}>
      {peers.map((peer) => (
        <Profile profile={peer} short={true} />
      ))}
    </SimpleGrid>
  );
}
