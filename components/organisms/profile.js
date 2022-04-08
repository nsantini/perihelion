import { Heading, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";

export default function Profile({ profile, short }) {
  return (
    <Container>
      <Stack align={"center"}>
        <Avatar image={profile.imageBlob} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        {!short && <Content text={profile.description} />}
        <Button>Follow</Button>
      </Stack>
    </Container>
  );
}
