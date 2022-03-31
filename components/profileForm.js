import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Center,
  Text,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import Button from "./button";
import Textarea from "./textarea";

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
      <Center py={6}>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Avatar
            size={"xl"}
            src={`data:image/png;base64,${Buffer.from(profile.image || "")}`}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
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
        </Box>
      </Center>
    </form>
  );
}
