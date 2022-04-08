import { useState } from "react";
import { Center, Text, Input, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Textarea from "../atoms/textarea";
import Avatar from "../atoms/avatar";
import Container from "../atoms/container";
import BlobUploader from "../molecules/blobUploader";

export default function ProfileForm({ profile }) {
  const [postError, setPostError] = useState("");
  const [name, setName] = useState(profile.name);
  const [description, setDescription] = useState(profile.description);
  const [image, setImage] = useState(profile.image);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setPostError("");
    setIsSuccessfullySubmitted(false);
    const response = await fetch(`/api/profile/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        image,
      }),
    });
    const rData = await response.json();
    response.ok ? setIsSuccessfullySubmitted(true) : setPostError(rData.error);
  };

  let blobUloaded = (data) => {
    setImage(data.hash);
  };

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <Center>
          <Avatar image={image} />
        </Center>
        <Center>
          <BlobUploader blobUloaded={blobUloaded} />
        </Center>
        <Input
          mt={2}
          fontSize={"2xl"}
          fontFamily={"body"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Center>
          {postError && (
            <Text color="tomato" mt="2">
              {postError}
            </Text>
          )}
          {isSuccessfullySubmitted && (
            <Text mt="2" color="green">
              Profile updated!
            </Text>
          )}
          <Button>Submit changes</Button>
        </Center>
      </Container>
    </form>
  );
}
