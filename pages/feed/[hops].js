import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import Feed from "../../components/organisms/feed";
import Navigation from "../../components/molecules/navigation";

export default function FeedPage() {
  const router = useRouter();
  const { hops, page = 1 } = router.query;
  return (
    <Stack>
      <Feed hops={hops} page={page} />
      <Navigation />
    </Stack>
  );
}
