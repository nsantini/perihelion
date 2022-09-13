import { Heading, Link, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";
import useProfile from "../../hooks/profile";

export default function Profile({ feedId, short }) {
  const { profile, isLoading, isError, mutate } = useProfile(feedId);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const updateFollowing = async (e) => {
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
    if (response.ok) mutate({ ...profile, following: !profile.following });
  };

  const updateBlocking = async (e) => {
    e.preventDefault;
    const response = await fetch(`/api/block`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedId: profile.id,
        currentState: profile.blocking,
      }),
    });
    const data = await response.json();
    if (response.ok) mutate({ ...profile, blocking: !profile.blocking });
  };

  const renderActions = profile => {
    if (profile.blocking) {
      return <Button onClick={updateBlocking}>Unblock</Button>;
    } else if (profile.following) {
      return <Link onClick={updateFollowing}>Unfollow</Link>;
    } else {
      return (
        <>
          <Button onClick={updateFollowing}>Follow</Button>
          <Link onClick={updateBlocking}>Block</Link>
        </>
      );
    }
  }

  return (
    <Container>
      <Stack align={"center"}>
        <Avatar image={profile.imageBlob} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          <Link href={`/profile/${encodeURIComponent(feedId)}`}>
            {profile.name}
          </Link>
        </Heading>
        {!short && <Content text={profile.description} />}
        {renderActions(profile)}
      </Stack>
    </Container>
  );
}
