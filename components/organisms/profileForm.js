import { useState } from "react";
import { useForm } from "react-hook-form";
import { Center, Text, Input } from "@chakra-ui/react";
import Button from "../atoms/button";
import Textarea from "../atoms/textarea";
import Avatar from "../atoms/avatar";
import Container from "../atoms/container";

export default function ProfileForm({ profile }) {
  const [postError, setPostError] = useState("");
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data, e) => {
    setPostError("");
    setIsSuccessfullySubmitted(false);
    const response = await fetch(`/api/profile/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const rData = await response.json();
    response.ok ? setIsSuccessfullySubmitted(true) : setPostError(rData.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Center>
          <Avatar image={profile.image} />
        </Center>
        <Input
          fontSize={"2xl"}
          fontFamily={"body"}
          name="name"
          {...register("name", { value: profile.name })}
        />
        <Textarea
          name="description"
          register={register}
          registerName="description"
          registerProps={{ value: profile.description }}
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
