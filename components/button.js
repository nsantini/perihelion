import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button({ children }) {
  return (
    <ChakraButton
      w={"full"}
      maxW={"320px"}
      colorScheme="frost"
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      type="submit"
      mt={2}
    >
      {children}
    </ChakraButton>
  );
}
