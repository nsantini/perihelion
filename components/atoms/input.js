import { Input as ChakraInput, useColorModeValue } from "@chakra-ui/react";

export default function Input({ name, placeholder, value, onChange }) {
  return (
    <ChakraInput
      color={useColorModeValue("polar.100", "snow.500")}
      focusBorderColor={useColorModeValue("frost.700", "snow.500")}
      px={3}
      mt={4}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
