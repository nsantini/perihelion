import { SimpleGrid } from "@chakra-ui/react";
import usePeers from "../../hooks/peers";
import Profile from "../organisms/profile";

export default function Peers() {
  const { peers, isLoading, isError } = usePeers();
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <SimpleGrid columns={2}>
      {peers &&
        peers.map &&
        peers.map((peer) => <Profile feedId={peer.id} short={true} />)}
    </SimpleGrid>
  );
}
