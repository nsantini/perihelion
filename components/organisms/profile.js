import { Heading, Link, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";

export default function Profile({ profile, short }) {
  const updateState = async (e) => {
    e.preventDefault;
    const response = await fetch(`/api/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedId: profile.id,
        currentState: profile.following,
      }),
    });
  };

  return (
    <Container>
      <Stack align={"center"}>
        <Avatar image={profile.imageBlob} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        {!short && <Content text={profile.description} />}
        {!profile.following && <Button onClick={updateState}>Follow</Button>}
        {profile.following && <Link onClick={updateState}>Unfollow</Link>}
      </Stack>
    </Container>
  );
}
