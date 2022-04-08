import { Avatar as ChakraAvatar } from "@chakra-ui/react";

export default function Avatar({ image, size }) {
  return (
    <ChakraAvatar
      size={size || "xl"}
      src={`data:image/png;base64,${Buffer.from(image || "")}`}
      alt={"Avatar Alt"}
      pos={"relative"}
    />
  );
}
