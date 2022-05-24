import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <Flex
      mt="2"
      p="2"
      width="100%"
      direction={"column"}
      boxShadow={"lg"}
      bg={useColorModeValue("snow.500", "polar.700")}
    >
      {children}
    </Flex>
  );
}
