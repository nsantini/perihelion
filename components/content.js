import { Text, useColorModeValue } from "@chakra-ui/react";
import ssbMarkdown from "ssb-markdown";

export default function Content({ text }) {
  return (
    <Text
      overflowX={"scroll"}
      textAlign={"left"}
      color={useColorModeValue("polar.100", "snow.300")}
      px={3}
      dangerouslySetInnerHTML={{ __html: ssbMarkdown.block(text) }}
    />
  );
}
