import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import MessageForm from "../../components/organisms/messageForm";
import Container from "../../components/atoms/container";
import Feed from "../../components/organisms/feed";

export default function FeedPage() {
  const router = useRouter();

  const { hops } = router.query;

  return (
    <Stack>
      <Container>
        <MessageForm />
      </Container>

      <Feed hops={hops} />
    </Stack>
  );
}
