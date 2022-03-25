import { Avatar, chakra, Flex, useColorModeValue } from "@chakra-ui/react";
import useProfile from "../hooks/profile"

export default function MessageCard(props) {
  const { author, timestamp, text, index } = props;
  const { profile, isLoading, isError } = useProfile(author);
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
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
          src={`data:image/png;base64,${Buffer.from(profile.image)}`}
          height={"80px"}
          width={"80px"}
          alignSelf={"left"}
          m={{ base: "0 0 35px 0", md: "0 0 10px 0" }}
        />
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          {profile.name}
        </chakra.p>
      </Flex>
      <chakra.p
        fontFamily={"Inter"}
        fontWeight={"medium"}
        fontSize={"15px"}
        pl={4}
      >
        {text}
      </chakra.p>
    </Flex>
  );
}
