import { Button as ChakraButton, useColorModeValue } from "@chakra-ui/react";

export default function Button({ children }) {
  return (
    <ChakraButton
      w={"full"}
      maxW={"320px"}
      bgColor={useColorModeValue("frost.700", "frost.500")}
      color={useColorModeValue("snow.500", "snow.500")}
      rounded={"md"}
      type="submit"
      mt={2}
    >
      {children}
    </ChakraButton>
  );
}
