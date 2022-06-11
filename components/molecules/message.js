import {
  IconButton,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Content from "../atoms/content";
import Voter from "../atoms/voter";
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
        <Popover trigger="hover">
          <PopoverTrigger>
            <Text mt={2} mr={1}>
              {voters.length}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              {voters.map((voter) => (
                <Voter profileId={voter} />
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton onClick={vote} icon={<StarIcon />} />
      </Flex>
    </Flex>
  );
}
