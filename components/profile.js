import {
  Heading,
  Box,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "./button";
import Avatar from "./avatar";
import Content from "./content";

export default function Profile({ profile }) {
  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar image={profile.image} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        <Content text={profile.description} />

        <Button>Follow</Button>
      </Box>
    </Center>
  );
}
