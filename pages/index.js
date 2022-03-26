import { Container, Stack, Heading, Text, Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Perihelion <br />
          <Text
            as={"span"}
            color={"green.400"}
            fontSize={{ base: "1xl", sm: "2xl", md: "4xl" }}
          >
            your ssb buddy
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Access one of the most friendly decentrilised social networks, while
          ownling all your data.
        </Text>
      </Stack>
    </Container>
  );
}
