import { Avatar, chakra, Flex, useColorModeValue } from "@chakra-ui/react";

export default function MessageCard(props) {
  const { name, content, avatar, index } = props;
  return (
    <Flex
      boxShadow={"lg"}
      width="100%"
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={5}
      justifyContent={"left"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Avatar
          src={avatar}
          height={"80px"}
          width={"80px"}
          alignSelf={"left"}
          m={{ base: "0 0 35px 0", md: "0 0 10px 0" }}
        />
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          {name}
        </chakra.p>
      </Flex>
      <chakra.p
        fontFamily={"Inter"}
        fontWeight={"medium"}
        fontSize={"15px"}
        pl={4}
      >
        {content}
      </chakra.p>
    </Flex>
  );
}
