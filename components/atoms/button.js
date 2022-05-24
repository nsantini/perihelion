import { Button as ChakraButton, useColorModeValue } from "@chakra-ui/react";

export default function Button({ children, onClick }) {
  return (
    <ChakraButton
      w={"full"}
      maxW={"320px"}
      bgColor={"frost.700"}
      color={"snow.500"}
      rounded={"md"}
      type="submit"
      onClick={onClick}
      mt={2}
    >
      {children}
    </ChakraButton>
  );
}
