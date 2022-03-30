import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function Profile({ profile }) {
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
      <Flex direction={"row"} textAlign={"left"}>
        <Avatar
          src={`data:image/png;base64,${Buffer.from(profile.image || "")}`}
          size={"md"}
          alignSelf={"left"}
          m={{ base: "0 0 35px 0", md: "0 0 10px 0" }}
        />
        <Text>{profile.name}</Text>
      </Flex>
      <Text mt="2">{profile.description}</Text>
    </Flex>
  );
}
