import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "./button";

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
        <Avatar
          size={"xl"}
          src={`data:image/png;base64,${Buffer.from(profile.image || "")}`}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        <Text
          textAlign={"left"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {profile.description}
        </Text>

        <Button>Follow</Button>
      </Box>
    </Center>
  );
}
