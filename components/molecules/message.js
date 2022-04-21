import { IconButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Content from "../atoms/content";
import Author from "./author";

export default function MessageCard(props) {
  const { author, timestamp, text, blobs, index, voters, msgId } = props;
  const vote = async (e) => {
    e.preventDefault();
    const data = {
      msgId,
    };
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rData = await response.json();

    if (!response.ok) {
      console.error(rData.error);
    }
  };
  return (
    <Flex
      key={index}
      width="100%"
      direction={"column"}
      rounded={"xl"}
      p={5}
      justifyContent={"left"}
      position={"relative"}
      textAlign={"left"}
    >
      <Author author={author} timestamp={timestamp} />
      <Content text={text} blobs={blobs} />
      <Flex justifyContent={"right"}>
        <Text mt={2} mr={1}>
          {voters.length}
        </Text>
        <IconButton onClick={vote} icon={<StarIcon />} />
      </Flex>
    </Flex>
  );
}
