import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import Thread from "../../components/molecules/thread";
import useThread from "../../hooks/thread";

export default function Feed() {
  const router = useRouter();

  const { msgId } = router.query;
  const { thread, isLoading, isError } = useThread(msgId);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      <Thread thread={thread} />
    </Stack>
  );
}
