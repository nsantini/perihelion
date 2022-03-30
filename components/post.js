import { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Textarea,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Post({ root }) {
  const [postError, setPostError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = async (data, e) => {
    data.root = root;
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
    } else {
      reset();
      root && onClose();
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
      {(isOpen || !root) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            name="text"
            placeholder="Write your message here"
            {...register("text", { required: true })}
          />

          {postError && (
            <Text color="tomato" mt="2">
              {postError}
            </Text>
          )}

          <Button colorScheme="blue" type="submit" mt="2">
            Post message
          </Button>
        </form>
      )}
      {!isOpen && root && (
        <form>
          <Button colorScheme="teal" mt="2" onClick={isOpen ? onClose : onOpen}>
            Reply to thread
          </Button>
        </form>
      )}
    </Flex>
  );
}
