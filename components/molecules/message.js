import { Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Content from "../atoms/content";
import Author from "./author";

export default function MessageCard(props) {
  const { author, timestamp, text, blobs, index, voters } = props;

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
        {voters.length}
        <StarIcon mt={1} ml={1} />
      </Flex>
    </Flex>
  );
}
