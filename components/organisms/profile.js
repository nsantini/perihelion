import { useState } from "react";
import { Heading, Link, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";
import useProfile from "../../hooks/profile";

export default function Profile({ feedId, short }) {
  const { profile, isLoading, isError } = useProfile(feedId);
  //const [following, setFollowing] = useState(profile.following);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

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
    // if (response.ok) setFollowing(data.following);
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
