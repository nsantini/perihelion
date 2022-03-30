import { useState } from "react";
import { Avatar, Textarea, Text, Input, Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

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
    <Flex
      width="100%"
      direction={"column"}
      rounded={"xl"}
      p={5}
      justifyContent={"left"}
      position={"relative"}
      textAlign={"left"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={"row"} textAlign={"left"}>
          <Avatar
            src={`data:image/png;base64,${Buffer.from(profile.image || "")}`}
            size={"md"}
            alignSelf={"left"}
            m={{ base: "0 0 35px 0", md: "0 0 10px 0" }}
          />
          <Flex direction={"column"} textAlign={"left"} ml="2">
            <Input name="name" {...register("name", { value: profile.name })} />
          </Flex>
        </Flex>
        <Textarea
          name="description"
          {...register("description", { value: profile.description })}
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
        <Button colorScheme="blue" mt="2" type="submit">
          Submit changes
        </Button>
      </form>
    </Flex>
  );
}
