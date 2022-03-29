import { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Post() {
  const [postError, setPostError] = useState("");
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (data) => {
    setPostError("");
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rData = await response.json();

    if (!response.ok) {
      setPostError(rData.error);
    }
  };

  return (
    <Flex
      mt="2"
      p="2"
      width="100%"
      direction={"column"}
      boxShadow={"lg"}
      justifyContent={"left"}
      position={"relative"}
      textAlign={"left"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          name="message"
          placeholder="Write your post here"
          {...register("message", { required: true })}
        />

        {errors && errors.message && (
          <Text color="tomato" mt="2">
            This message is required
          </Text>
        )}
        {postError && (
          <Text color="tomato" mt="2">
            {postError}
          </Text>
        )}

        <Button colorScheme="blue" type="submit" mt="2">
          Post message
        </Button>
      </form>
    </Flex>
  );
}
