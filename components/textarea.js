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
      color={useColorModeValue("gray.700", "gray.400")}
      px={3}
      mt={4}
      name={name}
      placeholder={placeholder}
      {...register(registerName, registerProps)}
    />
  );
}
