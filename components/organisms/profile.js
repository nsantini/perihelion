import { useState } from "react";
import { Heading, Link, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";

export default function Profile({ profile, short }) {
  const [following, setFollowing] = useState(profile.following);
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
    const data = await response.json();
    if (response.ok) setFollowing(data.following);
  };

  return (
    <Container>
      <Stack align={"center"}>
        <Avatar image={profile.imageBlob} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        {!short && <Content text={profile.description} />}
        {!following && <Button onClick={updateState}>Follow</Button>}
        {following && <Link onClick={updateState}>Unfollow</Link>}
      </Stack>
    </Container>
  );
}
