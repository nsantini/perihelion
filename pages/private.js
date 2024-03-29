import { Stack } from "@chakra-ui/react";
import Container from "../components/atoms/container";
import RepliesLink from "../components/atoms/repliesLink";
import MessageCard from "../components/molecules/message";
import MessageForm from "../components/organisms/messageForm";
import usePrivate from "../hooks/usePrivate";
import useProfile from "../hooks/profile";

export default function FeedPage() {
  const { threads, isLoading, isError, mutate } = usePrivate();
  const { profile, isLoading: isProfileLoading, isError: isProfileError } = useProfile("self");

  if (isError || isProfileError) return <div>Failed to load</div>;
  if (isLoading || isProfileLoading) return <div>Loading...</div>;

  const newMesssage = (msg) => {
    mutate([{ replyCount: 0, messages: [msg] }, ...threads]);
  };

  return (
    <Stack>
      <Container>
        <MessageForm recps={[profile.id]} newMesssage={newMesssage} isPrivate={true} />
      </Container>
      {threads &&
        threads.map &&
        threads.map((thread, index) => (
          <Container key={index}>
            <MessageCard {...thread.messages[0]} />
            <RepliesLink
              msgId={thread.messages[0].msgId}
              replyCount={thread.replyCount}
              isPrivate={true}
            />
          </Container>
        ))}
    </Stack>
  );
}
