import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import Profile from "../../components/organisms/profile";
import Feed from "../../components/organisms/feed";

export default function ProfilePage() {
  const router = useRouter();
  const { feedId, page = 1 } = router.query;

  return (
    <Stack>
      <Profile feedId={feedId} />
      <Feed hops={encodeURIComponent(feedId)} page={page} />
    </Stack>
  );
}
