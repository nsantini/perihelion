import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Text,
  Link,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "./button";
import Textarea from "./textarea";

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
      textAlign={"center"}
      bg={useColorModeValue("grey.50", "polar.100")}
    >
      {(isOpen || !root) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            name="text"
            placeholder="Write your message here"
            register={register}
            registerName="text"
            registerProps={{ required: true }}
          />

          {postError && (
            <Text color="tomato" mt="2">
              {postError}
            </Text>
          )}

          <Button>Post message</Button>
        </form>
      )}
      {!isOpen && root && (
        <Link
          color={useColorModeValue("frost.700", "frost.500")}
          mt="2"
          onClick={isOpen ? onClose : onOpen}
        >
          Reply to thread
        </Link>
      )}
    </Flex>
  );
}
