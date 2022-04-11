import { useState } from "react";
import {
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Input from "../components/atoms/input";
import Container from "../components/atoms/container";
import Button from "../components/atoms/button";
import Peers from "../components/organisms/peers";
import ProfileForm from "../components/organisms/profileForm";
import useProfile from "../hooks/profile";

export default function Settings() {
  const { profile, isLoading, isError } = useProfile("self");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState("");

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const claim = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invite }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setInvite("");
    }
  };

  return (
    <Stack>
      <Heading color={useColorModeValue("polar.100", "snow.100")} as="h2">
        Perihellion Settings
      </Heading>
      <Container>
        <Heading color={useColorModeValue("polar.100", "snow.100")} as="h4">
          Claim a Pub invite
        </Heading>
        <Input value={invite} onChange={(e) => setInvite(e.target.value)} />
        {error && (
          <Text color="tomato" mt="2">
            {error}
          </Text>
        )}
        <Center>
          <Button onClick={claim}>Claim</Button>
        </Center>
      </Container>
      <Container>
        <Heading color={useColorModeValue("polar.100", "snow.100")} as="h4">
          Update Profile
        </Heading>
        <ProfileForm profile={profile} />
      </Container>
      <Container>
        <Heading color={useColorModeValue("polar.100", "snow.100")} as="h4">
          Online Peers
        </Heading>
        <Peers />
      </Container>
    </Stack>
  );
}
