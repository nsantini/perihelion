import {
  Textarea as ChakraTextarea,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Textarea({
  register,
  registerName,
  registerProps,
  name,
  placeholder,
}) {
  return (
    <ChakraTextarea
      color={useColorModeValue("polar.100", "snow.500")}
      focusBorderColor={useColorModeValue("frost.700", "snow.500")}
      px={3}
      mt={4}
      name={name}
      placeholder={placeholder}
      {...register(registerName, registerProps)}
    />
  );
}
